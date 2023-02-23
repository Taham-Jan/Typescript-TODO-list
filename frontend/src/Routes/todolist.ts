import {todolist} from '../models/todolistModel';

async function fetchData(input:RequestInfo, init?: RequestInit) {
     const response = await fetch(input, init);
     if(response.ok)
     {
        return response
     }
     else {
      const errorBody = await response.json();
      const errorMessage = errorBody.error;
      throw Error(errorMessage);  
     }
}

export async function fetchTodoList(): Promise<todolist[]> {
    const response = await fetchData("/api/todolist", {method: "GET"});
    return response.json();
}

export interface ListInput {
    title?:string,
    todo?:[]
} 
export async function createTodoList(list:ListInput):Promise<todolist> {
    const response = await fetchData("/api/todolist",
    {
        method: "POST",
        headers: {
                "Content-Type":"application/json",
        },
        body: JSON.stringify(list),
    })
    return response.json();
}