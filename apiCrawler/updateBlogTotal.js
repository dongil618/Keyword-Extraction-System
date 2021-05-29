import blogApi from "./searchApi"
import mongodb from "mongodb"

let MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';


export const updateBlogTotal = async function () {
    (async () => {
        let client = await MongoClient.connect(url,
            { useNewUrlParser: true });
        let db = client.db('keywordEver');
        let blogTotal = 0;
        try {
            const col = db.collection('keyword');
            const Keywords = await db.collection("keyword").find().toArray();
            Keywords.forEach(async function (keyword) {
                blogTotal = blogApi.cal_BlogSearch(keyword.keywordName).then(async function (result) {
                    await col.updateOne({ "keywordName": keyword.keywordName }, { $set: { "blogTotal": result.total } });
                    console.log(result.total);
                }).catch(async function (err) {
                    console.log('블로그 에러');
                    await col.updateOne({ "keywordName": keyword.keywordName }, { $set: { "blogTotal": 0 } });
                })
            });
        } catch (error) {
            console.log('디비에러');
        }
        finally {

        }
    })()
        .catch(err => console.error(err));

    //const Keywords = await Keyword.findById(); //isCompleteness가 False인 것을 find => Keywords에 넣어서 배열화
};


export default updateBlogTotal;