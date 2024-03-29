
// Import React and React Native modules
import { FC } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

// Import Redux modules
import { useSelector, useDispatch } from 'react-redux';
import { showNewGameModal } from "../redux/modalsSlice";

// Import other modules
import { State, NavigationPropType, } from "../types";
import * as Colors from './../styles/Colors';
import * as Sizes from '../styles/Sizes';
import { CStyles } from "../styles/CommonStyles";
import GameListItem from "../components/GameListItem";
import Control from "../components/Control";
import NewGameModal from '../modals/NewGameModal';
import ConfirmModal from "../modals/ConfirmModal";

type HomeProps = {
  navigation: NavigationPropType,
}

const Home: FC<HomeProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const game = useSelector((state: State) => state.game);

  return (
    <View style={Styles.app}>
      <ScrollView contentContainerStyle={Styles.game}>
        <Text style={[CStyles.text, CStyles.title]}>GAMES</Text>
        <View style={Styles.gameListContainer}>
          {game.allIds.map((id) => { 
            if (!game.byId[id].deleted) {
              return (
                <GameListItem
                  key={id}
                  id={id}
                />
              )
            }
          })}
          <Control
            onPress={() => dispatch(showNewGameModal(0))}
            text={'+ GAME'}
            pressableStyles={[Styles.addButton]}
            textStyles={[{fontSize:30}]}
          />
        </View>
      </ScrollView>
      <NewGameModal
        navigation={navigation}
      />
      <ConfirmModal
        navigation={navigation}
      />
    </View>
  );
};

export default Home;

const Styles = StyleSheet.create({
  app: {
    backgroundColor: Colors.COLOR1,
    flex: 1,

  },
  game: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR1,
    paddingBottom: Sizes.TAB_BAR_HEIGHT,
    alignItems: 'center',
  },
  gameListContainer: {
    width: '100%',
    padding: 10,
    gap: 15,
    maxWidth: 400,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: Colors.COLOR4,
    width: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
  }
});