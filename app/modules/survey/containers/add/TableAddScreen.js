
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Item, Label, Input, Body, Left, Right, Icon, Form, Text, Segment } from 'native-base';

import { Actions } from 'react-native-router-flux';
import SurveyAddForm from '../../components/form/SurveyAddForm';
import {addSurvey, updateSurvey} from '../../actions'
import { addAct, updateAct } from '../../../../actions/api';

const surveyInitial = {
  questions:[],
  answers:[],
  frequency: '1d',
}

class SurveyTableAddScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 1,
    };
  }

  pushRoute(route) {
    Actions.push(route)
  }

  popRoute() {
    Actions.pop()
  }

  onAddSurvey = (body) => {    
    const {addSurvey, addAct} = this.props
    let data = {...body, questions: [], mode: 'table'}
    let params = { act_data: data, type:'survey', title}
    return addAct(params).then( res => {
      Actions.push('survey-edit-question',{actIndex:0, questionIndex:0})
    }).catch(err => {
      console.log(err)
      Toast.show({text: 'Error! '+err.message, type: 'danger', buttonText: 'OK' })
    })
    
  }

  onEditSurvey = (body) => {
    let {actIndex, user, updateAct} = this.props
    let survey = {...this.state.survey, ...body}
    let {title, ...act_data} = survey
    let act = {title, act_data}

    if(user.role == 'clinician') {
      return updateAct(actIndex, act).then(result => {
        Actions.pop()
      }).catch(err => {
        Toast.show({text: 'Error! '+err.message, type: 'danger', buttonText: 'OK' })
      })
    } else {
      Actions.pop()
    }
  }

  componentWillMount() {
    let {surveys, surveyIdx} = this.props
    if(surveyIdx) {
      const survey = surveys[surveyIdx]
      this.setState({survey})
    } else {
      this.setState({})
    }
  }

  render() {
    const {survey} = this.state;
    let title = survey ? survey.title : "New Table Survey"
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{flex:3}}>
            <Title>{title}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Content padder>
            {survey ? (<SurveyAddForm onSubmit={this.onEditSurvey} initialValues={survey}/>) : (<SurveyAddForm onSubmit={this.onAddSurvey} initialValues={surveyInitial}/>) }
          </Content>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  addAct, updateAct
}

const mapStateToProps = state => ({
  acts: state.core.acts,
  themeState: state.drawer.themeState,
  user: state.core.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyTableAddScreen);
