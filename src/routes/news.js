const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

newsRouter.get('', async (req, res) => {
    try {
         var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=in&' +
          'apiKey=36f3e29b704f41339af8439dc1228334';
        const newsAPI = await axios.get(url)
        //const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts/`)
        res.render('news', { articles: newsAPI.data.articles })
    } catch (err) {
        if (err.response) {
            res.render('news', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.request) {
            res.render('news', { articles: null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles: null })
            console.error('Error', err.message)
        }
    }
})

newsRouter.get('/:id', async (req, res) => {
    //let articleID = req.params.id
    let category = req.params.category;
    try {
       
        var url = 'http://newsapi.org/v2/top-headlines?country=in&category=' 
        + category + 
        '&apiKey=36f3e29b704f41339af8439dc1228334';
        const newsAPI = await axios.get(url)

         //const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts/${articleID}`)
        res.render('newsSingle', { article: newsAPI.data })
    } catch (err) {
        if (err.response) {
            res.render('newsSingle', { article: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('newsSingle', { article: null })
            console.log(err.requiest)
        } else {
            res.render('newsSingle', { article: null })
            console.error('Error', err.message)
        }
    }
})


newsRouter.post('', async (req, res) => {
    //let search = req.body.search
    let search = req.body.search
    try {

        var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=36f3e29b704f41339af8439dc1228334`

        //const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts?search=${search}`)
        const newsAPI = await axios.get(url)
        res.render('newsSearch', { articles: newsAPI.data })
    } catch (err) {
        if (err.response) {
            res.render('newsSearch', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('newsSearch', { articles: null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles: null })
            console.error('Error', err.message)
        }
    }
})


module.exports = newsRouter 
