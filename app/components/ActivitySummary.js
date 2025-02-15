import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import {
  BodyText,
  SubHeading,
} from './core';
import { colors } from '../themes/colors';
import theme from '../themes/base-theme';

const styles = StyleSheet.create({
  box: {
    padding: 20,
    paddingTop: 40,
    fontFamily: theme.fontFamily,
  },
  description: {
    marginBottom: 30,
    fontFamily: theme.fontFamily,
  },
  lockup: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 20,
    fontFamily: theme.fontFamily,
  },
  icon: {
    fontSize: 30,
    color: colors.tertiary,
    marginRight: 16,
  },
});

const formatTime = (timestamp) => {
  const time = moment(timestamp);
  if (moment().isSame(time, 'day')) {
    return moment(timestamp).format('[today at] h:mm A');
  }
  return moment(timestamp).format('MMMM D');
};

const lastCompletedString = (timestamp) => {
  if (!timestamp) {
    return 'Not yet completed';
  }
  return `Last completed ${formatTime(timestamp)}`;
};

const nextScheduledString = (activity) => {
  if (!activity.nextScheduledTimestamp) {
    return 'Unscheduled';
  }
  if (activity.isOverdue) {
    return `Was due ${formatTime(activity.nextScheduledTimestamp)}`;
  }
  return `Scheduled for ${formatTime(activity.nextScheduledTimestamp)}`;
};

const ActivitySummary = ({ activity, onPressStart, primaryColor }) => (
  <View style={styles.box}>
    <SubHeading>{activity.name.en}</SubHeading>
    <BodyText style={styles.description}>
      {activity.description.en}
    </BodyText>
    <View style={styles.lockup}>
      <Icon type="FontAwesome" name="calendar" style={styles.icon} />
      <BodyText>{nextScheduledString(activity)}</BodyText>
    </View>
    <View style={styles.lockup}>
      <Icon type="FontAwesome" name="history" style={styles.icon} />
      <BodyText>{lastCompletedString(activity.lastResponseTimestamp)}</BodyText>
    </View>
    <Button onPress={onPressStart} full rounded style={{ backgroundColor: primaryColor }}>
      <Text>Start</Text>
    </Button>
  </View>
);

ActivitySummary.propTypes = {
  activity: PropTypes.object.isRequired,
  onPressStart: PropTypes.func.isRequired,
  primaryColor: PropTypes.string.isRequired,
};

export default ActivitySummary;
