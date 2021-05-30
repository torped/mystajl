// @flow
import * as React from "react";
import {StyleSheet, ScrollView} from "react-native";

import Story from "./Story";
import AddStory from "./AddStory";

import type {NavigationProps} from "../../Navigation";
import type {Story as StoryModel, User} from "../Model";

type StoriesProps = NavigationProps<> & {
    stories: StoryModel[],
    users: User[]
};

export default class Stories extends React.PureComponent<StoriesProps> {

    render(): React.Node {
        const {navigation, stories, users} = this.props;
        return (
            <ScrollView contentContainerStyle={styles.stories} showsHorizontalScrollIndicator={false} horizontal>
                <AddStory />
                {
                    stories.map(story => {
                        const user = users.find(u => u.id === story.user);
                        return (
                            <Story
                                key={story.id}
                                uri={user.picture}
                                read={story.read}
                                id={story.id}
                                {...{navigation}}
                            />
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    stories: {
        alignItems: "center",
        height: 80
    }
});
