import React from 'react';
import { StyleSheet, Text, TextInputProps, TouchableOpacityProps, View } from 'react-native';

import I18n from '../../../i18n';
import sharedStyles from '../../Styles';
// import { CustomIcon } from '../../../containers/CustomIcon';
import { useTheme } from '../../../theme';
import SearchHeader from '../../../containers/SearchHeader';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		flexShrink: 1,
		fontSize: 16,
		...sharedStyles.textSemibold
	},
	subtitle: {
		fontSize: 14,
		...sharedStyles.textRegular
	},
	upsideDown: {
		transform: [{ scaleY: -1 }]
	}
});

interface IRoomHeader {
	connecting: boolean;
	connected: boolean;
	isFetching: boolean;
	serverName: string;
	server: string;
	showServerDropdown: boolean;
	showSearchHeader: boolean;
	onSearchChangeText: TextInputProps['onChangeText'];
	onPress: TouchableOpacityProps['onPress'];
}

const Header = React.memo(
	({
		connecting,
		connected,
		isFetching,
		serverName = 'Rocket.Chat',
		server,
		// showServerDropdown,
		showSearchHeader,
		onSearchChangeText
	}: // onPress
	IRoomHeader) => {
		const { colors } = useTheme();

		if (showSearchHeader) {
			return <SearchHeader onSearchChangeText={onSearchChangeText} testID='rooms-list-view-search-input' />;
		}
		let subtitle;
		if (connecting) {
			subtitle = I18n.t('Connecting');
		} else if (isFetching) {
			subtitle = I18n.t('Updating');
		} else if (!connected) {
			subtitle = I18n.t('Waiting_for_network');
		} else {
			subtitle = server?.replace(/(^\w+:|^)\/\//, '');
		}
		return (
			<View style={styles.container}>
				{/* <TouchableOpacity onPress={onPress} testID='rooms-list-header-server-dropdown-button'> */}
				<View style={styles.button}>
					<Text style={[styles.title, { color: colors.headerTitleColor }]} numberOfLines={1}>
						{serverName}
					</Text>
					{/* <CustomIcon
						name='chevron-down'
						color={colors.headerTintColor}
						style={[showServerDropdown && styles.upsideDown]}
						size={18}
					/> */}
				</View>
				{subtitle ? (
					<Text
						testID='rooms-list-header-server-subtitle'
						style={[styles.subtitle, { color: colors.auxiliaryText }]}
						numberOfLines={1}
					>
						{subtitle}
					</Text>
				) : null}
				{/* </TouchableOpacity> */}
			</View>
		);
	}
);

export default Header;
