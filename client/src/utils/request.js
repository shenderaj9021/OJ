import axios from 'axios'

const token = localStorage.getItem('userinfo')

const backend = axios.create({
    // baseURL: `${process.env.BACKEND_URL}`,
    baseURL:"http://localhost:4000"
  });

  export const register = (data) => {
    return backend.post("/api/auth/register", data);
  };
  
  export const login = (data) => {
    return backend.post("/api/auth/login", data);
  };
  
export const getAllProblems = () =>{
  return backend.get("/api/problem");
}
export const getProblem =async  (problemId)=>{
  return backend.get(`/api/problem/${problemId}`)
}
export const runCode = async (data) =>{
 
  return backend.post("/api/solve/run",data ,{
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const getRunInfo = async(data) =>{
 
  return backend.post("/api/solve/getRun",data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const submitCode = async (data) =>{
 
  return backend.post("/api/solve/submit",data,{
    headers :{ Authorization: `Bearer ${token}`},
  })
}
export const getSubmission = async (data) =>{
  
  return backend.post("/api/solve/getSubmission",data,{
    headers:{Authorization:`Bearer ${token}`}
  })
}

export const getProblemSubmission = async (data) =>{
  return backend.post("/api/solve/getProblemSub",data,{
    headers:{Authorization:`Bearer ${token}`}
  })
}