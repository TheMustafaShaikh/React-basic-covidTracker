import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import {useEffect} from 'react';
import {useContext} from 'react';
import Data from './context';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Search() {
  const classes = useStyles();
  const [state, setState] = React.useState("");
  const [countries,setCountries] = React.useState([]);
  let getGlobalData = useContext(Data);
  getGlobalData[1](state);
  useEffect(()=>{
      fetch("https://covid19.mathdro.id/api/countries").then((response)=>{
          return response.json()
      }).then((data)=>{
            let arr = []
            
            let getCountries = data.countries;
            getCountries.forEach((element)=>{
                arr.push(element.name)
            })
            setCountries(arr)
      })
},[])


  return (
    <div>
        <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">Countries</InputLabel>
        <Select
          native
          value={state}
          onChange={(event)=>setState(event.target.value)}
          >
          <option value="worldwide" selected>worldwide</option>    
          {countries.map((name)=> <option value={name} >{name}</option>)}
        </Select>
      </FormControl>
    </div>
  );
}
