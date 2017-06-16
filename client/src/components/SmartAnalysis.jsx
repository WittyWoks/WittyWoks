import React from 'react';
import axios from 'axios';
import DonutChart from './C3Components/DonutChart.jsx';
import KeywordBarChart from './C3Components/KeywordBarChart.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import LinearProgress from 'material-ui/LinearProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
  },
  check: {
    color: '#1DE9B6'
  },
  cross: {
    color: '#FFAF36'
  },
  tab: {
    background: '#424242',
    color: 'rgba(255, 255, 255, 0.7)',
    bottom: 0
  },
  inkBar: {
    background: '#1DE9B6',
    bottom: 0
  },
  card: {
    backgroundColor: '#424242',
    // maxWidth: '500'
  },
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    color: 'whitesmoke'
  }
};

class SmartAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loaded0: false,
      barChartDates: null,
      barChartJobsApplied: null,
      jobsAppliedTo: null,
      allData: [],
      keywordsRanking: null,
      donutChart: false,
      skills: [],
      consumptionPreferences: null,
      needs: null,
      personality: null,
      values: null,
      summary: null,
      likely: [],
      unlikely: [],
      emotionTones: null,
      languageTones: null,
      socialTones: null,
      value: 'a',
      value0: 'd',
      keywordBar: true
    };
    this.fetchAllAppliedJob();
    // this.analyzeResume();

    // C3 Card
    this.handleChange0 = this.handleChange0.bind(this);
    this.keywordRender = this.keywordRender.bind(this);

    // IBM Card
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange0(value) {
    this.setState({
      value0: value
    });
  }

  keywordRender() {
    this.setState({
      keywordBar: true
    });
  }

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  fetchAllAppliedJob() {
    this.getResume();
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/user',
      datatype: 'json'
    })
    .done(data => {
      if (data.email) {
        axios.get('/ReturnJobsApplied', {
          params: {
            google_id: data.id
          }
        })
        .then((jobs) => {

          context.setState({
            allData: jobs.data
          });
          let datesObj = {};
          let yAxis = ['Applied'];
          let xAxis = [];

          jobs.data.forEach((job) => {
            let convertedDate = (new Date(job.created_at)).toDateString();
            if (!datesObj[convertedDate]) {
              datesObj[convertedDate] = 1;
            } else {
              datesObj[convertedDate] += 1;
            }
          });

          for (let key in datesObj) {
            yAxis.push(datesObj[key]);
            xAxis.push(key);
          }

          context.setState({
            barChartDates: xAxis,
            barChartJobsApplied: yAxis,
            jobsAppliedTo: jobs.data,
          });

          this.urlParser(context.state.allData, this.state.skills);
        })
        .catch(err => {
          console.error('Error occured getting jobs', err);
        });
      }
    });
  }

  urlParser(DataArray, skills) {
    let context = this;
    $.ajax({
      type: 'POST',
      url: '/urlParser',
      contentType: 'application/JSON',
      data: JSON.stringify({
        data: DataArray,
        skills: skills
      })
    })
    .done((ranking) => {
      ranking = JSON.parse(ranking);
      context.setState({
        keywordsRanking: ranking
      });
      if (context.state.keywordsRanking !== null) {
        context.setState({
          donutChart: true
        });
      }
    })
    .fail(err => {
      console.error('Error occured getting jobs', err);
    });
  }

  getResume() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/user',
      datatype: 'json'
    })
    .done((user) => {
      $.ajax({
        url: '/getResume',
        type: 'GET',
        data: {resume_id: user.resume_id},
      })
      .done((resume) => {
        context.setState({
          skills: resume.skills.split(','),
          file: resume.resume_url
        });
      })
      .fail(function(err) {
        console.log('failed to GET', err);
      });
    })
    .fail(function(err) {
      console.log('failed to GET', err);
    });
  }

  analyzeResume() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/user',
      datatype: 'json'
    })
    .done((user) => {
      $.ajax({
        url: '/getResume',
        type: 'GET',
        data: {resume_id: user.resume_id},
      })
      .done((resume) => {
        console.log('line240');
        axios.get('/analyzeResume', {
          params: {
            url: resume.resume_url
          }
        })
        .then((personality) => {
          console.log('line247');
          let consumption = personality.data.personality.main.consumption_preferences;
          for (let i = 0; i < consumption.length; i++) {
            let category = consumption[i].consumption_preference_category_id;
            if (category === 'consumption_preferences_entrepreneurship' || category === 'consumption_preferences_reading' || category === 'consumption_preferences_health_and_activity') {
              for (let j = 0; j < consumption[i].consumption_preferences.length; j++) {
                if (consumption[i].consumption_preferences[j].score === 1) {
                  context.state.likely.push(consumption[i].consumption_preferences[j].name.substring(9));
                } else if (consumption[i].consumption_preferences[j].score === 0) {
                  context.state.unlikely.push(consumption[i].consumption_preferences[j].name.substring(9));
                }
              }
            }
          }
          context.setState({
            needs: personality.data.personality.main.needs,
            personality: personality.data.personality.main.personality,
            values: personality.data.personality.main.values,
            summary: personality.data.personality.summary,
            emotionTones: personality.data.tone.main['document_tone']['tone_categories'][0].tones,
            languageTones: personality.data.tone.main['document_tone']['tone_categories'][1].tones,
            socialTones: personality.data.tone.main['document_tone']['tone_categories'][2].tones,
            loaded: true
          });
        });
      })
      .fail(function(err) {
        console.log('failed to GET', err);
      });
    })
    .fail(function(err) {
      console.log('failed to GET', err);
    });
  }

  render() {
    return (
      <div>
        <div className="container wow fadeIn" data-wow-delay="0.2s">
          <div className="divider-new">
            <h2 className="h2-responsive primary-text">Smart Analysis</h2>
          </div>

          <div className="row">
            <div className="col-sm-6">
              {this.state.donutChart ? <DonutChart ranking={this.state.keywordsRanking} /> : <p className="disabled-text">Loading...</p>}
            </div>
            <div className="col-sm-6">
              {this.state.donutChart && this.state.keywordBar ? <KeywordBarChart ranking={this.state.keywordsRanking}/> : <p className="disabled-text">Loading...</p>}
            </div>
          </div>
          <div className="row">
            <div className="text-center secondary-text">
              <p>The following skills were extracted from your résumé and compared
              with the skillset required on the jobs you applied for. If a skill on
              your resume appears in a job posting, our algorithm will tally it and
              automatically figure out how often your skills appeared on the jobs that
              interest you the most.</p>
            </div>
          </div>
        </div>

        <section id="offer" className="container wow fadeIn">
          <div className="divider-new">
            <h2 className="h2-responsive primary-text">IBM Watson</h2>
          </div>

          <div className="wow fadeIn text-center secondary-text">
            {this.state.loaded === false ?
              <p className="disabled-text">Loading...</p>
            :
            <div>
              <p className="secondary-text">{this.state.summary}</p>
              <div className="row">
                <div className="col-sm-6">
                  <h4 className="primary-text">You are likely to:</h4>
                  {this.state.likely.map((like) => {
                    return (
                      <List>
                        <ListItem style={styles.item} primaryText={like} leftIcon={<i className="fa fa-check-circle-o" aria-hidden="true" style={styles.check}></i>} />
                      </List>
                    );
                  })}
                </div>
                <div className="col-sm-6">
                  <h4 className="primary-text">You are unlikely to:</h4>
                  {this.state.unlikely.map((dislike) => {
                    return (
                      <List>
                        <ListItem style={styles.item} primaryText={dislike} leftIcon={<i className="fa fa-times-circle-o" aria-hidden="true" style={styles.cross}></i>} />
                      </List>
                    );
                  })}
                </div>
              </div>
            </div>
            }
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card-deck">
                <div className="card" style={styles.card}>
                    <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%2813%29.jpg" alt="Card image cap"/>
                    <div className="card-block">
                        <h4 className="card-title primary-text">Resume Tone</h4>
                        {this.state.loaded === false ?
                          <p>Loading...</p>
                        :
                        <div>
                          <h6 className="secondary-text"> &#60; .5 = not likely present</h6>
                          <h6 className="secondary-text"> &#62; .5 = likely present</h6>
                          <h6 className="secondary-text"> &#62; .75 = very likely present </h6>
                          <div className="row">
                            <div className="col-sm-12">
                              {this.state.emotionTones.map((emotion) => {
                                return (
                                  <p className="secondary-text"><LinearProgress mode="determinate" value={emotion.score * 100} />{emotion.tone_name}: {emotion.score.toFixed(2)} <span className="emotion-rating">{emotion.score.toFixed(2) < 0.5 ? 'NOT LIKELY' : emotion.score.toFixed(2) > 0.75 ? 'VERY LIKELY' : 'LIKELY'}</span></p>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="card" style={styles.card}>
                    <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%2840%29.jpg" alt="Card image cap"/>
                    <div className="card-block">
                        <h4 className="card-title primary-text">Language Style</h4>
                        {this.state.loaded === false ?
                          <p>Loading...</p>
                        :
                        <div>
                          <h6 className="secondary-text"> &#60; .5 = not likely present</h6>
                          <h6 className="secondary-text"> &#62; .5 = likely present</h6>
                          <h6 className="secondary-text"> &#62; .75 = very likely present </h6>
                          <div className="row">
                            <div className="col-sm-12">
                              {this.state.languageTones.map((emotion) => {
                                return (
                                  <p className="secondary-text"><LinearProgress mode="determinate" value={emotion.score * 100} />{emotion.tone_name}: {emotion.score.toFixed(2)} <span className="emotion-rating">{emotion.score.toFixed(2) < 0.5 ? 'NOT LIKELY' : emotion.score.toFixed(2) > 0.75 ? 'VERY LIKELY' : 'LIKELY'}</span></p>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="card" style={styles.card}>
                    <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%2842%29.jpg" alt="Card image cap"/>
                    <div className="card-block">
                        <h4 className="card-title primary-text">Social Tendencies</h4>
                        {this.state.loaded === false ?
                          <p>Loading...</p>
                        :
                        <div>
                          <h6 className="secondary-text"> &#60; .5 = not likely present</h6>
                          <h6 className="secondary-text"> &#62; .5 = likely present</h6>
                          <h6 className="secondary-text"> &#62; .75 = very likely present </h6>
                          <div className="row">
                            <div className="col-sm-12">
                              {this.state.socialTones.map((emotion) => {
                                return (
                                  <p className="secondary-text"><LinearProgress mode="determinate" value={emotion.score * 100} />{emotion.tone_name}: {emotion.score.toFixed(2)} <span className="emotion-rating">{emotion.score.toFixed(2) < 0.5 ? 'NOT LIKELY' : emotion.score.toFixed(2) > 0.75 ? 'VERY LIKELY' : 'LIKELY'}</span></p>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        }
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    );
  }
}

export default SmartAnalysis;
