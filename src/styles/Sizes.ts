import { Dimensions } from "react-native";
import Constants from 'expo-constants';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const MED_BUTTONS = 70;
export const SMALL_BUTTONS = 48;
export const MAX_MODAL_WIDTH = 600;

export const SMALL_BORDER_RADIUS = 2;
export const MED_BORDER_RADIUS = 2;
export const LARGE_BORDER_RADIUS = 2;

export const TAB_BAR_HEIGHT = SCREEN_HEIGHT * 0.1;
export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
