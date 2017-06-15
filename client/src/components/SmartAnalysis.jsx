import React from 'react';
import axios from 'axios';
import DonutChart from './C3Components/DonutChart.jsx';
import KeywordBarChart from './C3Components/KeywordBarChart.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import LinearProgress from 'material-ui/LinearProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  check: {
    color: '#01B4A0'
  },
  cross: {
    color: '#5596E6'
  },
  rating: {
    fontWeight: 200,
    fontSize: '0.8em'
  },
  cardTitle: {
    background: '#607d8b'
  },
  tab: {
    background: '#676767',
    color: 'rgba(255, 255, 255, 0.7)',
    bottom:0
  },
  inkBar: {
    background: '#1DE9B6',
    bottom:0
  },
  tabBody: {
    background: '#F5F5F6'
  },
    jobs: {
      color: 'white'
    },
    cardHeader: {
      backgroundColor: '#424242',
      padding: '10px'
    },
    card: {
      backgroundColor: '#424242'
    },
    chip: {
      margin: 4
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap'
    },
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
      keywordBar: false
    };
    this.fetchAllAppliedJob();
    // this.analyzeResume();
    this.handleChange = this.handleChange.bind(this);
    this.handleChange0 = this.handleChange0.bind(this);
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  handleChange0(value) {
    this.setState({
      value0: value,
    });
  }

  keywordRender() {
    this.setState({
      keywordBar: true
    })
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

        axios.get('/analyzeResume', {
          params: {
            url: resume.resume_url
          }
        })
        .then((personality) => {
          let consumption = personality.data.personality.main.consumption_preferences;
          for (let i = 0; i < consumption.length; i++) {
            let category = consumption[i].consumption_preference_category_id;
            for (let j = 0; j < consumption[i].consumption_preferences.length; j++) {
              if (consumption[i].consumption_preferences[j].score === 1) {
                context.state.likely.push(consumption[i].consumption_preferences[j].name.substring(9));
              } else if (consumption[i].consumption_preferences[j].score === 0) {
                context.state.unlikely.push(consumption[i].consumption_preferences[j].name.substring(9));
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
      <div className="container wow fadeIn" data-wow-delay="0.2s">
        <div className="card-group">
          <div className="card" style={styles.card}>
            <div className="col-height col-md-auto shade">
              <Tabs
                value={this.state.value0}
                onChange={this.handleChange0}
                tabItemContainerStyle={styles.tab}
                inkBarStyle={styles.inkBar}
              >
               <Tab label="Summary" value="d">
                 {this.state.donutChart ? <DonutChart ranking={this.state.keywordsRanking} /> : <p>Loading...</p>}
               </Tab>
                <Tab label="Detailed" value="e" onClick={this.keywordRender.bind(this)}>
                  <h4 style={styles.headline}>Keywords Tracker by Count</h4>
                    {this.state.donutChart && this.state.keywordBar ? <KeywordBarChart ranking={this.state.keywordsRanking}/> : <p>Loading...</p>}
                </Tab>
                  <Tab label="Stats" value="f">
                    <h4 style={styles.headline}>Data Details</h4>
                    {this.state.donutChart === true ? <DonutChart ranking={this.state.keywordsRanking} /> : <p>Loading...</p> }
                  </Tab>
              </Tabs>
            </div>
              <div className="card-block">
                <h4 className="card-title primary-text">Keyword Analysis</h4>
              </div>
          </div>
          </div>
                <div className="card-group">
                  <div className="card" style={styles.card}>
                    <div className="equal-height shade">
                  <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    tabItemContainerStyle={styles.tab}
                    inkBarStyle={styles.inkBar}
                  >
                    <Tab label="Summary" value="a">
                      <div className="container-fluid">
                        <h4 style={styles.headline}>Your Personality Analysis</h4>
                        {this.state.loaded === false ?
                          <p>Loading...</p>
                        :
                        <div>
                          <p>{this.state.summary}</p>
                          <h4>You are likely to:</h4>
                          {this.state.likely.map((like) => {
                            return (
                              <span><i className="fa fa-check-circle-o" aria-hidden="true" style={styles.check}></i> {like}<br/></span>
                            );
                          })}
                          <h4>You are unlikely to:</h4>
                          {this.state.unlikely.map((dislike) => {
                            return (
                              <span><i className="fa fa-times-circle-o" aria-hidden="true" style={styles.cross}></i> {dislike}<br/></span>
                            );
                          })}

                        </div>
                        }
                      </div>
                    </Tab>
                    <Tab label="Tone" value="b">
                      <div className="container-fluid">
                        <h4 style={styles.headline}>Resume Tone</h4>
                        {this.state.loaded === false ?
                          <p>Loading...</p>
                        :
                        <div>
                          <h6> &#60; .5 = not likely present</h6>
                          <h6> &#62; .5 = likely present</h6>
                          <h6> &#62; .75 = very likely present </h6>
                          <div className="row">
                            <div className="col-sm-4">
                              <h4>Emotions</h4>
                              {this.state.emotionTones.map((emotion) => {
                                return (
                                  <p><LinearProgress mode="determinate" value={emotion.score * 100} />{emotion.tone_name}: {emotion.score.toFixed(2)} <span style={styles.rating}>{emotion.score.toFixed(2) < 0.5 ? 'NOT LIKELY' : emotion.score.toFixed(2) > 0.75 ? 'VERY LIKELY' : 'LIKELY'}</span></p>
                                );
                              })}
                            </div>
                            <div className="col-sm-4">
                              <h4>Language Style</h4>
                              {this.state.languageTones.map((emotion) => {
                                return (
                                  <p><LinearProgress mode="determinate" value={emotion.score * 100} />{emotion.tone_name}: {emotion.score.toFixed(2)} <span style={styles.rating}>{emotion.score.toFixed(2) < 0.5 ? 'NOT LIKELY' : emotion.score.toFixed(2) > 0.75 ? 'VERY LIKELY' : 'LIKELY'}</span></p>
                                );
                              })}
                            </div>
                            <div className="col-sm-4">
                              <h4>Social Tendencies</h4>
                              {this.state.socialTones.map((emotion) => {
                                return (
                                  <p><LinearProgress mode="determinate" value={emotion.score * 100} />{emotion.tone_name}: {emotion.score.toFixed(2)} <span style={styles.rating}>{emotion.score.toFixed(2) < 0.5 ? 'NOT LIKELY' : emotion.score.toFixed(2) > 0.75 ? 'VERY LIKELY' : 'LIKELY'}</span></p>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        }
                      </div>
                    </Tab>
                    <Tab label="Portrait" value="c">
                      <div className="container-fluid">
                        <h4 style={styles.headline}>Personality Portrait</h4>
                        {this.state.loaded === false ?
                          <p>Loading...</p>
                        :
                        <div>
                          <div className="row">
                            <div className="col-sm-4">
                              <h4>Needs</h4>
                              {this.state.needs.map((trait) => {
                                return (
                                  <div>
                                    <p><LinearProgress mode="determinate" value={trait.percentile * 100} />{trait.name}: {Math.floor(trait.percentile * 100)}%</p>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="col-sm-4">
                              <h4>Personality</h4>
                              {this.state.personality.map((trait) => {
                                return (
                                  <div>
                                    <p><LinearProgress mode="determinate" value={trait.percentile * 100} />{trait.name}: {Math.floor(trait.percentile * 100)}%</p>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="col-sm-4">
                              <h4>Values</h4>
                              {this.state.values.map((trait) => {
                                return (
                                  <div>
                                    <p><LinearProgress mode="determinate" value={trait.percentile * 100} />{trait.name}: {Math.floor(trait.percentile * 100)}%</p>
                                  </div>
                                );
                              })}
                            </div>

                          </div>
                        </div>
                        }
                      </div>
                    </Tab>
                  </Tabs>


                    </div>

                  <div className="card-block">
                    <h4 className="card-title primary-text">IBM Watson Analysis</h4>
                    <h6 className="card-text secondary-text">Smart analysis based on your resume</h6>
                  </div>
                  </div>
          </div>

      </div>
    );
  }
}

export default SmartAnalysis;
