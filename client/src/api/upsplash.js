import axios from "axios";	

export default axios.create({	
  baseURL: "https://api.unsplash.com/",	
  headers: {	
    Authorization:	
      "Client-ID 6cf803e5a9a074ed63904a010d499c8775b09dde01c739ae1f1dcc2c8fb97ca0"	
  }	
});