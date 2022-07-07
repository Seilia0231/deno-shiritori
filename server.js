
import{serve} from
"https://deno.land/std@0.138.0/http/server.ts";
import{serveDir} from
"https://deno.land/std@0.138.0/http/file_server.ts";

let previousWord
const firstWord = [`しりとり`,`れんげ`,`あさがお`,`むらさき`,`あじさい`,`さざえ`,`きさらぎ`,`かわ`];


function getRandomInt(max){
    return Math.floor(Math.random()*max);
}
const UntilNowWord = [""];
for(let i=0;i<firstWord.length;i++){
    if(getRandomInt(8) === i){
    if(getRandomInt(7) === i){
        previousWord = firstWord[i];
        UntilNowWord.push(firstWord[i]);
        UntilNowWord;
       
    }
}

console.log("Listening on http://localhost:8000");
serve(async(req)=>{
    const pathname = new URL(req.url).pathname;
    console.log(pathname);

    if (req.method === "GET" && pathname === "/shiritori"){
        return new Response(previousWord);
    }   
    if (req.method === "POST" && pathname === "/shiritori"){
        const requestJson = await req.json();
        const nextWord = requestJson.nextWord;
        const indexOf = UntilNowWord.indexOf(nextWord);
        if(nextWord.length > 0 && previousWord.charAt(previousWord.length-1)!==nextWord.charAt(0)){
            return new Response("前の単語に続いていません。",{ststus:400});
        }
        if(indexOf !== -1){
            return new Response("既に入力された単語です。",{status:400});
        }
          
        try{ 
            if(nextWord.charAt(nextWord.length-1) === "ん"){
                throw new Error("「ん」がついたので終了します。");
            }
          
        }
        catch(e){
           
            alert(e.message);
        } 
        UntilNowWord.push(nextWord);
        UntilNowWord;
        
        previousWord = nextWord;
        return new Response(previousWord);   
    }
    

    return serveDir(req, {
        fsRoot: "pudlic",
        urlRoot: "",
        showDirListing: true,
        enableCors: true,
    });
});