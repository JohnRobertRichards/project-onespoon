const express = require('express');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/test', (request, response) => {
    
    axios.get("https://www.saramin.co.kr/zf_user/search?search_area=main&search_done=y&search_optional_item=n&searchType=search&searchword=%EC%9E%AC%ED%83%9D%20%EA%B0%9C%EB%B0%9C", {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    }).then(httpResponse => {
        const $ = cheerio.load(httpResponse.data);
        
        const recruits = $('.item_recruit .area_job h2 a').toArray();
        const recruitNames = new Array();

        recruits.map(recruit => {
            const $ = cheerio.load(recruit);
            recruitNames.push($("span").text());
        });

        response.status(200).json({
            data: {
                'recruitNames': recruitNames,
            },
        });
    }).catch(error => {
        console.error(error);
    });
});

app.listen(port);
