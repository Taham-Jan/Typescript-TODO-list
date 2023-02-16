import listModel from '../models/List'
import { RequestHandler } from "express";
import createHttpError from 'http-errors';
import mongoose from 'mongoose';


export const listController:RequestHandler = async (req, res, next) => {
    try {
       const todolists = await listModel.find().exec();
       res.status(200).json(todolists);
    } catch (error) {
       next(error)
    }
 
 };

 export const getlistbyid:RequestHandler = async (req,res,next) => {
    const listid = req.params.listid;
    try {
        if(!mongoose.isValidObjectId(listid))
        {
            throw createHttpError(400, "Invalid TODO List ID")
        }
        const todolist = await listModel.findById(listid).exec();
       if (!todolist){
        throw createHttpError(404, "Todo-list Not Found");
       }
        res.status(200).json(todolist);
    } catch (error) {
        next(error)
    }
 };

interface CreateListBody {
    title?:string,
    todo?:[];
}

 export const newlistcontroller:RequestHandler<unknown,unknown,CreateListBody,unknown> =async (req,res,next) => {
   const title = req.body.title;
   const todo = req.body.todo;
    try {
        if(!title || !todo) {
            throw createHttpError(400, "Note must have a title and atleast 1 todo list");
        }
        const createnewlist = await listModel.create({
            title:title,
            todo:todo,
        });
        res.status(201).json(createnewlist)
    } catch (error) {
        next(error)
    }
    
 };

interface updateListParams {
    listid: string,
}

 interface updateListBody {
    title: string,
    todo:[],
 }
 export const updateListConstroller:RequestHandler<updateListParams,unknown,updateListBody,unknown> =async (req,res,next) => {
    const listid = req.params.listid;
    const newtitle = req.body.title;
    const newtodo = req.body.todo;
    try {
        if(!mongoose.isValidObjectId(listid))
        {
            throw createHttpError(400, "Invalid TODO List ID")
        }
        if(!newtitle || !newtodo) {
            throw createHttpError(400, "Note must have a title and atleast 1 todo list");
        }
        const todolist = await listModel.findById(listid).exec();
        if(!todolist){
            throw createHttpError(404,"Todo-list not found");
        }
        todolist.title = newtitle;
        todolist.todo = newtodo;
   
        const updatedList = await todolist.save();
        res.status(200).json(updatedList);

    } catch (error) {
        next(error)
    }
 };

export const deleteListController: RequestHandler =async (req,res,next) => {
    const listid = req.params.listid;
    try {
        if(!mongoose.isValidObjectId(listid))
        {
            throw createHttpError(400, "Invalid TODO List ID")
        }
        const todolist = await listModel.findById(listid).exec();
        if(!todolist){
            throw createHttpError(404,"Todo-list not found");
        }
        const deleted = todolist.remove();
        res.status(204).json(deleted);
    } catch (error) {
        next(error);   
    }
}