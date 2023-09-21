import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { getWetherByName } from '../src/services/wether';

const Info = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validInput, setInvalidInput] = useState(false);

    const onPressHandle = async () => {
        setWeatherData(null);
        setError(false);
        setLoading(true);
        setInvalidInput(false);
        const validCityPattern = /^[a-zA-Z\s]+$/;
        if (!city.trim()) {
            setInvalidInput(true);
            setLoading(false);
            return;
        } else if (!validCityPattern.test(city)) {
            setInvalidInput(true);
            setLoading(false);
            return;
        }
        try {
            const response = await getWetherByName(city);
            if (!response.error) {

                setWeatherData(response);
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);

        } finally { 
            setLoading(false);
        }
    }

    const handleChangeText = (text) => {
        setCity(text);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Enter City'
                    style={styles.input}
                    value={city}
                    onChangeText={handleChangeText}
                    placeholderTextColor='white'
                />
                <TouchableOpacity style={styles.searchButton} onPress={onPressHandle}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
            {loading && (
                <View>
                    <Text style={styles.loadingText}>Loading...</Text>
                    <Image
                        style={styles.loadingImage}
                        source={require('../Images/loading.gif')} // Reemplaza 'loading.gif' con la ruta de tu imagen de carga
                    />
                </View>
            )}
            {error && (

                <View>
                    <Text style={styles.errorText}>Ciudad No encontrada.</Text>
                    <Image
                        style={styles.errorImage}
                        source={require('../Images/5ewrzr.jpg')} // Reemplaza 'error.png' con la ruta de tu imagen de error
                    />
                </View>
            )}
            {weatherData && (
                <View style={styles.weatherContainer}>
                    <Text style={styles.locationText}>
                        {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
                    </Text>
                    <View style={styles.temperatureContainer}>
                        <Image
                            style={styles.weatherIcon}
                            source={{ uri: 'https:' + weatherData.current.condition.icon }}
                        />
                        <Text style={styles.tempText}>{weatherData.current.temp_c}°C</Text>
                    </View>
                    <Text style={styles.locationText}>Ultima Actualizacion: {weatherData.current.last_updated}</Text>
                </View>
            )}

            {validInput && (
                <View>
                    <Text style={styles.errorText}>Ingresa una Ciudad Valida

                    </Text>
                </View>

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        color: "white"

    },
    mainTitle: {
        fontSize: 32,
        color: "white",
        marginBottom: 20,
        justifyContent: 'flex-start'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: 'white',
        color: "white",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    temperatureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 32,
        color: 'white',
    },
    errorText: {
        marginTop: 20,
        fontSize: 32,
        color: 'white',
    },
    weatherContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    locationText: {
        fontSize: 24,
        color: 'white',
    },
    tempText: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
    },
    conditionText: {
        fontSize: 18,
        color: 'white',
    },
    weatherIcon: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    loadingImage: {
        width: 50,
        height: 50,
    },
    errorImage: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Info;
