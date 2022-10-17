import React from 'react'
import { Button, ScrollView, Text } from 'react-native'

function Dependientes({authUser}) {

  return (
    <ScrollView>
      <Text>I Welcome {authUser.username} with email {authUser.email}</Text>
    </ScrollView>
    
  )
}

export default Dependientes