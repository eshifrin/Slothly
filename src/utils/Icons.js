import React from 'react';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';

const DownIcon = (
  <FontAwesomeIcon name="chevron-down" color="white" size={25} />
);
const UpIcon = <FontAwesomeIcon name="chevron-up" color="white" size={25} />;

const CancelIcon = (
  <EntypoIcon name="circle-with-cross" size={75} color="#efdbc2" />
);

const UpdateIcon = (
  <Ionicon name="ios-checkmark-circle-outline" color="#032b82" size={75} />
);

export { DownIcon, UpIcon, CancelIcon, UpdateIcon };
