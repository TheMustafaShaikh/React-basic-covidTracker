import React,{useContext,useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import "./App.css"
import Data from "./context"


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ShowBox() {
  const classes = useStyles();
  let [cases,setCases] = useState("");
  let [recovered,setRecovered] = useState("");
  let [death,setDeath] = useState("")
  let getGlobal = useContext(Data);

  useEffect(()=>{
    
      console.log(getGlobal[0],"this is onne")
        if(getGlobal[0] === "worldwide"){
            fetch("https://covid19.mathdro.id/api").then((response)=>{
                return response.json()
            }).then((data)=>{
                console.log(data)
                setCases(data.confirmed.value);
                setRecovered(data.recovered.value)
                setDeath(data.deaths.value)
            })
            
        }else if(getGlobal[0] === ""){
          fetch("https://covid19.mathdro.id/api").then((response)=>{
                return response.json()
            }).then((data)=>{
                console.log(data)
                setCases(data.confirmed.value);
                setRecovered(data.recovered.value)
                setDeath(data.deaths.value)
            })
        }else{
            let lastCountry = getGlobal[0].toString()
            let url = "https://covid19.mathdro.id/api/countries/"+lastCountry;
            console.log(url)
            fetch(url).then((response)=>{
                return response.json()
            }).then((data)=>{
                setCases(data.confirmed.value);
                setRecovered(data.recovered.value)
                setDeath(data.deaths.value)
            })
        }
        

  },[getGlobal[0]])

  

  

  return (
      <div>
    <Container >
    <Grid container spacing={3} justify="center">
    <Grid item xs={12} sm={3}>      
    <Card className={classes.root} variant="outlined">
            <CardContent>
                
                <Typography variant="h6" className="head-total">
                TOTAL CASES
                </Typography>
               
                <Typography variant="h6">
                    {cases}
                </Typography>
            </CardContent>
            
    </Card>
    </Grid>
    <Grid item xs={12} sm={3}>      
    <Card className={classes.root} variant="outlined">
    <CardContent>
                
                <Typography variant="h6" className="head-recovered">
                RECOVERED CASES
                </Typography>
               
                <Typography variant="h6">
                    {recovered}
                </Typography>
            </CardContent>  
    </Card>
    </Grid>
    <Grid item xs={12} sm={3}>      
    <Card className={classes.root} variant="outlined">
    <CardContent>
                
                <Typography variant="h6" className="head-deaths">
                DEATHS CASES
                </Typography>
               
                <Typography variant="h6">
                    {death}
                </Typography>
            </CardContent>
    </Card>
    </Grid>
    
    </Grid>
    </Container>
    </div>
  );
}
