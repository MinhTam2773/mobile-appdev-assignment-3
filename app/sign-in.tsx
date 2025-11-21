import LoginForm from '@/components/LoginForm'
import React from 'react'
import { View } from 'react-native'

const SiginPage = () => {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
      <LoginForm />
    </View>
  )
}

export default SiginPage