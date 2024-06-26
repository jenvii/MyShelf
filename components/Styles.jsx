import { StyleSheet } from "react-native";

export const loginandRegistrationStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTextInputStyle: {
        width: 300,
        margin: 10,
        backgroundColor: '#E5CCC3'
    },
    messageContainer: {
        flexDirection: 'row'
    },
    buttonStyle: {
        margin: 8,
        width: 150
    },
    linkStyle: {
        color: 'blue'
    },
    errorMessageStyle: {
        color: 'red',
        textAlign: 'center',
        width: '90%'
    }
})

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        backgroundColor: '#3D2B24',
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        marginTop: 30,
        color: 'white',
        fontSize: 25
    },
    welcomeTextStyle: {
        fontSize: 35,
        textAlign: 'center'
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        paddingHorizontal: 20,
    },
    genreContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    listContainer: {
        flexDirection: 'row',
        flex: 8,
        alignItems: 'center'
    },
    bookContainer: {
        alignItems: 'center',
        marginBottom: 10,
        width: '50%',
    },
    thumbnail: {
        width: '80%',
        aspectRatio: 1,
        resizeMode: 'contain',
    }
});

export const genreButtonStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    buttonContainer: {
        margin: 1,
    }
})

export const searchStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    searchBarStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    textInputStyle: {
        flex: 1,
        width: '60%',
        backgroundColor: '#E5CCC3',
        margin: 10
    },
    listContainer: {
        flexDirection: 'row',
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%'
    },
    bookContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        width: '50%',
    },
    thumbnail: {
        width: '80%',
        height: 180,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    titleStyle: {
        fontSize: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    buttonStyle: {
        width: 150
    },
    emptySearchStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptySearchTextStyle: {
        fontSize: 20,
        textAlign: 'center',
        color: '#3D2B24'
    }
});

export const bookStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        paddingTop: 50,
        padding: 10,
        alignSelf: 'flex-start',
    },
    thumbnail: {
        width: '70%',
        aspectRatio: 1,
        resizeMode: 'contain',
        margin: 10,
        marginLeft: 25
    },
    bookInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    bookTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    bookAuthorStyle: {
        fontSize: 17
    },
    favoriteButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    favoriteButtonStyle: {
        width: '60%'
    },
    bookDescription: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%'
    }
});

export const bookShelfStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flexDirection: 'row',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: '98%'
    },
    listStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '98%',
        justifyContent: 'space-between',

    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
    },
    textStyle: {
        maxWidth: '80%',
    },
    thumbnail: {
        width: '40%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    removeButtonContainer: {
        marginLeft: 'auto',
    },
});