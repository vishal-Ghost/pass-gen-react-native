import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const PassGen = () => {

    const passwordSchema = yup.object().shape({
        passwordLength : yup.number()
        .required('length is required')
        .min(4,'min value must be 4')
        .max(16, 'maximun length must be 16')
    })

    const [password, setpassword] = useState('');
    const [isPassGenerated,setisPassGenerated] = useState(false);
    const[lowerCase,setlowercase] = useState(true);
    const [UpperCase,setupperCase] = useState(false);
    const [numbers,setnumbers] = useState(false);
    const [symbols,setsymbols] = useState(false)

    function generatePassword(length :number){
        let characterString : string = ''
        const UpperCaseChar : string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const Number : string = '0123456789';
        const lowerCaseChar : string = 'abcdefghijklmnopqrstuvwxyz';
        const specialChar : string = '!@#$%^&*()_+';

        if(lowerCase){
            characterString += lowerCaseChar
        } 
        if(UpperCase){
            characterString += UpperCaseChar
        } 
        if(numbers){
            characterString += Number
        }
        if(symbols){
            characterString += specialChar
        }

        const finalPassword = passGenrator(length,characterString)
        setpassword(finalPassword);
        setisPassGenerated(true)
    }

    function passGenrator(length:number,charaters :string){
        let result = ''
        for (let index = 0; index < length; index++) {
            const charaterIndex = Math.round(Math.random() * charaters.length);
            result += charaters.charAt(charaterIndex)
        };
        return result;
    }

    function resetStates(){
        setlowercase(true);
        setupperCase(false);
        setnumbers(false);
        setsymbols(false);
        setisPassGenerated(false)
    }

  return (
    <>
    <ScrollView keyboardShouldPersistTaps='handled'>
        <SafeAreaView>
            <View style={styles.mainCont} >
                <Text style={styles.Header}>Password Generator</Text>
                <Formik
                initialValues={{passwordLength:''}}
                validationSchema={passwordSchema}
                onSubmit={values =>{    
                    generatePassword(Number(values.passwordLength))
                }}
                >
                    {
                    ({
                        values,errors,touched,isValid,handleChange,handleSubmit,handleReset
                    })=>(
                        <>
                        <View style={styles.inputBox}>
                        <Text style={styles.inputHead}>Password Length</Text>
                        {touched.passwordLength && errors.passwordLength && <Text style={styles.errMsg}>{errors.passwordLength}</Text> }

                        
                            <TextInput
                            value={values.passwordLength}
                            onChangeText={handleChange('passwordLength')}
                            placeholder='Ex. 8'
                            keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.inputHead}>Include lowerCase</Text>
                            <BouncyCheckbox
                            disableBuiltInState
                            isChecked={lowerCase}
                            onPress={()=>setlowercase(!lowerCase)}
                            fillColor='#29AB87'
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.inputHead}>Include Upper Case</Text>
                            <BouncyCheckbox
                            disableBuiltInState
                            isChecked={UpperCase}
                            onPress={()=>setupperCase(!UpperCase)}
                            fillColor='#29AB87'
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.inputHead}>Include numbers</Text>
                            <BouncyCheckbox
                            disableBuiltInState
                            isChecked={numbers}
                            onPress={()=>setnumbers(!numbers)}
                            fillColor='#29AB87'
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.inputHead}>Include Symbols</Text>
                            <BouncyCheckbox
                            disableBuiltInState
                            isChecked={symbols}
                            onPress={()=>setsymbols(!symbols)}
                            fillColor='#29AB87'
                            />
                        </View>
                        <View style={styles.genResBtn}>
                            <TouchableOpacity
                            
                            disabled={!isValid}
                            onPress={()=>{handleSubmit()}}
                            ><Text style={styles.btnStyle}>Generate</Text></TouchableOpacity>
                            <TouchableOpacity                                                        
                             onPress={()=>{handleReset();resetStates()}}><Text style={styles.btnStyle}>Reset</Text></TouchableOpacity>

                        </View>
                        </>
                    )
                    }
                </Formik>
                {
                    isPassGenerated ? <View style={styles.result}>
                    <Text style={styles.resultFixTxt}>Long press to Copy: </Text>
                    <Text style={styles.resultTxt}  selectable>{password}</Text>
                    </View> : null
                }
            </View>
        </SafeAreaView>
    </ScrollView>
    </>
  )
}

export default PassGen

const styles = StyleSheet.create({
    Header :{
        flex :1,
        backgroundColor:'green',
        margin:8,
        fontSize: 28
    },
    inputBox :{
        flex :1,
        flexDirection:'row',
        justifyContent:'space-between',
        margin:18,
        alignItems:'center'
    },
    genResBtn :{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:16
    },
    btnStyle :{
        backgroundColor:'#0d6efd',
        padding:8,
        fontSize:22,
        borderRadius:10
    },
    errMsg:{
        color:'red'
    },
    mainCont:{
        flex :1
    },
    result:{
backgroundColor:'white',
height:100,
justifyContent:'center',
alignItems:'center',
marginTop:20
    },
    resultFixTxt:{
        color:'black'

    },
    resultTxt:{
        color:'black',
        fontSize:22,
        fontWeight:'bold',
        marginTop:10
    },
    inputHead:{
        fontSize:22,
        fontWeight:'bold'
    }
})