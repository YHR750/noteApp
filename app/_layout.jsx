import { Stack } from "expo-router";

const RootLayout = () => {
  return(
    <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#FF8C00',
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      contentStyle: {
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: '#FFF',
      },
    }}>
      <Stack.Screen name='index' options={{title:'Home'}}/>
      <Stack.Screen name='notes' options={{headerTitle:'Notes'}}/>
      <Stack.Screen name='login' options={{title:'Login'}}/>
    </Stack>
    
  );
}

export default RootLayout;