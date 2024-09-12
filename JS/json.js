//api 모듈화 https://frogand.tistory.com/207
//https://velog.io/@rks852/open-API-%EB%A1%9C-%ED%95%84%EC%9A%94%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B0%80%EA%B3%B5%ED%95%98%EA%B8%B0-Node.js-XML-JSON-Postman


/*API 요청 파라미터*/
let api_type = 'areaBasedSyncList1';
let serviceKey = 'ZhtsUt4Ys4qGfZI5%2FCZlZkYc%2B1SUIGFWvRvDB%2B9OdUvnjWEU1EXclqwEuGsloJ3l74GAEK73h137%2BZxxip8H5Q%3D%3D';
let MobileApp = 'AppTest';
let MobileOS = 'ETC';
let _type = 'json';
let showflag = 1;
let numOfRows = 100;
let listYN = 'Y';
let pageNo = '1';
let arrange = 'A';
let contentTypeId = 12;
let cat1 = 'A02';
let cat2 = 'A0201';
let cat3 = 'A02010100';
let url = `http://apis.data.go.kr/B551011/KorService1/${api_type}?serviceKey=${serviceKey}&MobileApp=${MobileApp}&MobileOS=${MobileOS}&_type=${_type}&showflag=${showflag}
    &numOfRows=${numOfRows}&listYN=${listYN}&pageNo=${pageNo}&arrange=${arrange}&contentTypeId=${contentTypeId}
    &cat1=${cat1}&cat2=${cat2}&cat3=${cat3}`;

//개행문자가 섞여 호출이 제대로 안되어 개행문자 제거
url = url.replace(/(\r\n\t|\n|\r\t)/gm,"");


/*
serviceKey=${serviceKey}&MobileApp=${MobileApp}&MobileOS=${MobileOS}&_type=${_type}&showflag=${showflag}
    &numOfRows=${numOfRows}&listYN=${listYN}&pageNo=${pageNo}&arrange=${arrange}&contentTypeId=${contentTypeId}
    &cat1=${cat1}&cat2=${cat2}&cat3=${cat3}
*/
//console.log(url);

//XML 요청


//JSON api 요청, string 용량이 너무 커져서 XML로 교체

//데이터 push
//var responseData =[];

//stringify에서 string이 너무 많이 생성되어 용량이 커져 오류남 다른 코드로 리펙토링 필요

/*API요청*/


fetch(url)
    .then(res => res.json())
    .then(data => {
        var result = data.response.body.items.item;
        var html_list = ' ';
        
        for(var i=0; i < result.length; i++){
            //ul
        console.log(i);
        if(i%5==0){
            html_list += `<ul class="main_context ${(i>20)?'none':''}"> `;
        }
            html_list +=`<li class="location_li">
                          <a href="" class="context_link">
                           <img src="${result[i].firstimage ? result[i].firstimage : " "}" class="location_img ${result[i].firstimage ? " " : "non-image"}"/>
                            <div class="location_context_box">
                             <span class="location_context">${ title_set = result[i].title ? result[i].title : "non-title"}</span>
                             <span class="location_context"></span>
                            </div>
                          </a>
                        </li>`;
        if(i%5==4){
            html_list += `</ul> `;
        }

        }
        
        

        document.getElementById("main_context_box").innerHTML = html_list ; 
    })
    .catch((error)=>console.log(error)); 



//결과값 불러오기, html에 실행해서 확인가능

console.log();






