const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// 리스너
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// db연동예제
app.get('/testsave', (req, res) => {
    // DB 연결
    const dbURI = 'mongodb://localhost:27017/test';
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB 연결 오류:'));
    db.once('open', () => {
        console.log('MongoDB에 연결되었습니다.');
    });

    // 예제 데이터베이스 모델 정의
    const Schema = mongoose.Schema;
    const exampleSchema = new Schema({
        name: String,
        age: Number
    });

    const ExampleModel = mongoose.model('Example', exampleSchema);

    // 예제 데이터베이스에 데이터 추가
    const exampleData = new ExampleModel({ name: 'John Doe', age: 25 });
    exampleData.save()
        .then(savedDocument => {
            console.log('문서가 저장되었습니다:', savedDocument);
        })
        .catch(error => {
            console.error('문서 저장 중 오류 발생:', error);
        });

    res.send('저장되었습니다');
});




