import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { MAIN_COLOR } from "../../utilities/theme";
import {
    Button,
    Form,
    Grid,
    Header,
    Icon,
    Message,
    Segment,
    Card, Image 
  } from "semantic-ui-react";
/** import Redux Slice  */
import { getcontacts, createContact } from "../../redux/contacts";


export default function AddContact() {
    const dispatch = useDispatch();
    const { errors, loading } = useSelector((state) => state.contacts);
    const contacts = useSelector(state => state.contacts)
    // const [homeNo,setHomeNO]=useState();
    // const [phoneNo,setPhoneNO]=useState();
    // const [email,setEmail]=useState("");
    // const [contactName,setContactName]=useState("");

    const [formValues, setFormValues] = useState({
        contactName: " ",
        email: " ",
        phoneNo:" " ,
        homeNo: " ",



    });

    const getcontactsdata = () => {

        console.log("get contacts")

        return dispatch(getcontacts());

    };

    const handleChange = (e, { name, value }) => {
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = () => {
         dispatch(createContact(formValues));
         getcontactsdata();
         
    };

    useEffect(() => {
        // getArticle();
        // getProjectDataByProject();
        // getActualCoostdataByProject();
        getcontactsdata();

    }, []);



    return (
        <div>
             <Grid
        padded
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        textAlign="center"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Icon size="huge" name="user circle" />
          <Header as="h2" color={"black"} textAlign="center">
            add category
          </Header>
          <Form
            size="large"
            onSubmit={handleSubmit}
            loading={loading}
            
          >
            <Segment stacked>
              <Form.Input
                fluid
                name="contactName"
                icon="name"
                iconPosition="left"
                placeholder="ContactName"
                onChange={handleChange}
                autoComplete="name"
                focus
                required
              
              />
              <Form.Input
                fluid
                name="email"
               
                iconPosition="left"
                placeholder="email"
                onChange={handleChange}
                autoComplete="description"
                focus
                required
               
              />
                <Form.Input
                fluid
                name="phoneNo"
               
                iconPosition="left"
                placeholder="phoneno"
                onChange={handleChange}
                autoComplete="description"
                focus
                required
              
              />
                <Form.Input
                fluid
                name="homeNo"
               
                iconPosition="left"
                placeholder="homeno"
                onChange={handleChange}
                autoComplete="description"
                focus
                required
              
              />

              <Button    color={MAIN_COLOR} fluid size="large" loading={loading}>
                Add Contact
              </Button>

            </Segment>
          </Form>

        </Grid.Column>

      </Grid>



      
       


        </div>
    )
}
