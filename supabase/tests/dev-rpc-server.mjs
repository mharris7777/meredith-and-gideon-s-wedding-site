// Local QA adapter for the actual Postgres functions, not a production server.
import { createServer } from 'node:http';
import { createTestDatabase, rpc } from './helpers.mjs';
const { db } = await createTestDatabase();
createServer(async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','http://localhost:5174');
  res.setHeader('Access-Control-Allow-Headers','content-type,apikey');
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
  if(req.method==='OPTIONS'){res.writeHead(204);res.end();return;}
  if(req.method!=='POST'||req.headers.apikey!=='sb_publishable_local_test'){res.writeHead(403);res.end();return;}
  res.setHeader('Content-Type','application/json');
  try{
    const chunks=[];for await(const c of req)chunks.push(c);
    const params=JSON.parse(Buffer.concat(chunks).toString());
    const name=req.url.split('/').pop();const result=await rpc(db,name,params);
    res.end(JSON.stringify(result));
  }catch(error){res.writeHead(400);res.end(JSON.stringify({message:error.message}));}
}).listen(54322,'127.0.0.1',()=>console.log('Local Postgres RPC adapter ready on 54322'));
