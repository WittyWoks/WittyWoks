let resizeMixin={
    componentWillMount(){

      var _self=this;

      $(window).on('resize', function(e) {
          _self.updateSize();
      });
      this.setState({width:this.props.width});

    },
    componentDidMount() {
      this.updateSize();
    },
    componentWillUnmount(){
      $(window).off('resize');
    },

    updateSize(){
      let node = ReactDOM.findDOMNode(this);
      let parentWidth=$(node).width();

      if(parentWidth<this.props.width){
        this.setState({width:parentWidth-20});
      }else{
        this.setState({width:this.props.width});
      }
    }
};
export default resizeMixin;
