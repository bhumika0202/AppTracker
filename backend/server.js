import express from 'express';

const app = express();

const PORT = 5000;

app.get('/',() => {
    console.log('backend server is runnig....');  
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});