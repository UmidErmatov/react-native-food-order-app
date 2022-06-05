import { View, Text } from 'react-native'
import React from 'react'
import BottomSheet from 'reanimated-bottom-sheet'
import colors from '../../constants/colors'

const BottomSheetComp = ({ sheetRef, renderContent }) => {

    return (
        <BottomSheet
            initialSnap={0}
            ref={sheetRef}
            snapPoints={[0, '55%']}
            borderRadius={20}
            renderHeader={renderHeader}
            renderContent={renderContent}
            // enabledGestureInteraction
            // enabledHeaderGestureInteraction
            enabledContentGestureInteraction
        />
    )
}

export default BottomSheetComp

const renderHeader = () => (
    <View style={{
        // borderWidth: 1,
        // borderColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5
    }}>
        <View style={{
            height: 4,
            width: '12%',
            backgroundColor: colors.black,
            borderRadius: 40,
            // marginBottom: 6
        }} />
    </View>
)