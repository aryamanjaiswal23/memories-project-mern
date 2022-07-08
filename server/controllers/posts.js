import express from 'express'
import postMessage from '../models/postMessage.js'
import mongoose from 'mongoose'
const router = express.Router()
export const getPosts = async(req, res) => {

    try {
        const postMessages = await postMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const getPost = async(req, res) => {
    const { id } = req.params
    try {
        const post = await postMessage.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const createPost = async(req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body
    const newPostMessage = new postMessage({ title, message, selectedFile, creator, tags })
    try {
        await newPostMessage.save()
        res.status(201).json(newPostMessage)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
export const updatePost = async(req, res) => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no such data with this id')
    const updatedPost = await postMessage.findByIdAndUpdate(_id, {...post, _id }, { new: true })
    res.json(updatedPost)
}
export const deletePost = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no such data with this id')
    await postMessage.findByIdAndDelete(id)
    res.send('deleted post')
}
export const likePost = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no such data with this id')
    const post = await postMessage.findById(id)
    const updatedPost = await postMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })
    res.json(updatedLike)
}