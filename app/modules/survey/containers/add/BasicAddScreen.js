
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SurveyAddScreen from './SurveyAddScreen'


export default class SurveyBasicAddScreen extends SurveyAddScreen {
  getMode() {
    return 'basic'
  }
}
