//api 모듈화 https://frogand.tistory.com/207
//https://velog.io/@rks852/open-API-%EB%A1%9C-%ED%95%84%EC%9A%94%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B0%80%EA%B3%B5%ED%95%98%EA%B8%B0-Node.js-XML-JSON-Postman


/*요청 데이터 API 주소 설정 */ 
var api_type = 'searchFestival1';

/*한국 관광공사 API 필수 파라미터*/
var serviceKey = 'ZhtsUt4Ys4qGfZI5%2FCZlZkYc%2B1SUIGFWvRvDB%2B9OdUvnjWEU1EXclqwEuGsloJ3l74GAEK73h137%2BZxxip8H5Q%3D%3D';
var MobileApp = 'AppTest';
var MobileOS = 'ETC';
var _type = 'json';


/*고궁 전체 리스트 API 요청 파라미터*/

var numOfRows = 100;
var listYN = 'Y';
var pageNo = '1';
var arrange = 'A';
var eventStartDate = '20240922';


var url = `http://apis.data.go.kr/B551011/KorService1/${api_type}?serviceKey=${serviceKey}&MobileApp=${MobileApp}&MobileOS=${MobileOS}&_type=${_type}&eventStartDate=${eventStartDate}&numOfRows=${numOfRows}&listYN=${listYN}&pageNo=${pageNo}&arrange=${arrange}`;


//개행문자가 섞여 호출이 제대로 안되어 개행문자 제거
//url = url.replace(/(\r\n\t|\n|\r\t)/gm,"");


/*
serviceKey=${serviceKey}&MobileApp=${MobileApp}&MobileOS=${MobileOS}&_type=${_type}&showflag=${showflag}
    &numOfRows=${numOfRows}&listYN=${listYN}&pageNo=${pageNo}&arrange=${arrange}&contentTypeId=${contentTypeId}
    &cat1=${cat1}&cat2=${cat2}&cat3=${cat3}
*/
console.log(url);



//var select = select_location.options[select_location.selectedIndex].value;




/*고궁 전체 지역 API요청*/
fetch(url)
    .then(res => res.json())
    .then(data => {
        var result = data.response.body.items.item;

        console.log(result);
        
    })
    .catch((error)=>{
        
        console.log(error);
    }); 





