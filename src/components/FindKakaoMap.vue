<template>
    <div>
      <div id="map"></div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "KakaoMap",
    components: {},
    data() {
      return {
        map: null,
        positions: [],
        markers: [],
      };
    },
    props: {
      chargers: [],
    },
    watch: {
      chargers() {
        console.log("충전소", this.chargers);
        this.positions = [];
        this.chargers.forEach((charger) => {
          let obj = {};
          obj.title = charger.title;
          obj.latlng = new kakao.maps.LatLng(charger.latitude
  , charger.longitude);
          obj.img = charger.firstImage;
          obj.add = charger.addr1;
          obj.ctype = charger.contentTypeId;
          this.positions.push(obj);
        });
        this.loadMaker();
      },
    },
    created() {},
    mounted() {
      // api 스크립트 소스 불러오기 및 지도 출력
      if (window.kakao && window.kakao.maps) {
            this.loadMap();
            this.loadApi();
      } else { 
        this.loadScript();
      }
    },
    methods: {
      // api 불러오기
      loadScript() {
        const script = document.createElement("script");
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
          "478ba7c5d434665bb10ce7e2978bacaa" +
          "&autoload=false";
        /* global kakao */
        script.onload = () => window.kakao.maps.load(this.loadMap);
  
        document.head.appendChild(script);
          },
      //모빌리티 api 가져오기
        loadApi() {
              var params = {
                "origin": {
        "x": "127.11024293202674",
        "y": " 37.394348634049784"
    },
    "destination": {
        "x": "127.10860518470294",
        "y": "37.401999820065534"
    },
    "waypoints": [
        {
            "name": "name0",
            "x": "128.5383411",
            "y": "35.82815978"
        },
        {
            "name": "name1",
            "x": "126.8966762",
            "y": "35.14447757"
        }
    ],
    "priority": "RECOMMEND",
    "car_fuel": "GASOLINE",
    "car_hipass": false,
    "alternatives": false,
    "road_details": false
            }
              axios.post('https://apis-navi.kakaomobility.com/v1/waypoints/directions', params, {
                headers : {
                    'Authorization' :'KakaoAK 4a157f544898c7cd63a754a8c5494d51',
                    'Content-Type'  : 'application/json'
                }
            })
                .then(arg => {
                // eslint-disable-next-line no-unused-vars
                let {result_code, summary, sections} = arg?.data?.routes[0];
                console.log(arg)
                if(sections[0]){
                    let {distance, duration, guides : arrays, roads} = sections[0];  //distance : 미터단위, duration : 초 단위
                    
                    let detailRoads = [];

                    for(let i=0;i < roads.length;i++){
                        let arg = roads[i];
                        let mini = arg.vertexes;
                        let cursor = 0;
                        while(cursor < mini.length){
                            let obj = new window.kakao.maps.LatLng(mini[cursor+1], mini[cursor]);
                            detailRoads.push(obj);
                            cursor = cursor + 2;
                            if(cursor >= 1000000) break;
                        }                             
                    }
                    // eslint-disable-next-line no-unused-vars
                    arrays = arrays.map( (arg, idx)=>{
                        let{x, y}  = arg;
                        if(x && y){
                            arg.position = new window.kakao.maps.LatLng(arg.y, arg.x);
                        }
                        return arg;
                    });          
                         
                    let { title, position} = arrays[0];
                    // 마커 이미지의 이미지 크기 입니다
                    let imageSize = new window.kakao.maps.Size(24, 35);
                    // 마커 이미지를 생성합니다    
                    let image = new window.kakao.maps.MarkerImage('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png', imageSize);
                    // 마커를 생성합니다
                    // eslint-disable-next-line no-unused-vars
                    let marker1 = new window.kakao.maps.Marker({
                        map: this.map, // 마커를 표시할 지도
                        position,
                        title: title? title : '', // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        image // 마커 이미지 
                    });

                    let {title : title2, position : position2} = arrays[arrays.length-1];
                    // 마커 이미지의 이미지 크기 입니다
                    // 마커 이미지를 생성합니다    
                    let image2 = new window.kakao.maps.MarkerImage('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_drag.png', imageSize);
                    // 마커를 생성합니다
                    // eslint-disable-next-line no-unused-vars
                    let marker2 = new window.kakao.maps.Marker({
                        map: this.map, // 마커를 표시할 지도
                        position : position2,
                        title: title2? title2 : '', // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        image : image2 // 마커 이미지 
                    });                   
                        
                    // 지도에 표시할 선을 생성합니다
                    let polyline = new window.kakao.maps.Polyline({
                        //path: arrays.map( arg=> arg.position), // 선을 구성하는 좌표배열 입니다
                        path : detailRoads,
                        strokeWeight: 5, // 선의 두께 입니다
                        strokeColor: 'red', // 선의 색깔입니다
                        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle: 'solid' // 선의 스타일입니다
                    });

                    // 지도에 선을 표시합니다 
                    polyline.setMap(this.map);                      

                    let customOverlay = new window.kakao.maps.CustomOverlay({
                        position: new window.kakao.maps.LatLng(37.39843974939604, 127.10972941510465),
                        content: `<div class ="label">거리, 시간 : ${distance}, ${duration}</div>`
                    });

                    // 커스텀 오버레이를 지도에 표시합니다
                    customOverlay.setMap(this.map);

                    //지우는 방법
                    // setTimeout(() => {
                    //     polyline.setMap(null);
                    //     customOverlay.setMap(null);
                    //     marker1.setMap(null);
                    //     marker2.setMap(null);
                    // }, 3000);
                }
            }).catch(err => {
                console.log(err)
            });
          },
      // 맵 출력하기
      loadMap() {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
  
        this.map = new window.kakao.maps.Map(container, options);
        //   this.loadMaker();
      },
      // 지정한 위치에 마커 불러오기
      loadMaker() {
        // 현재 표시되어있는 marker들이 있다면 marker에 등록된 map을 없애준다.
        console.log("1111");
        this.deleteMarker();
        console.log("2222");
        // 마커 이미지를 생성합니다
        //   const imgSrc = require("@/assets/map/markerStar.png");
        // 마커 이미지의 이미지 크기 입니다
        //   const imgSize = new kakao.maps.Size(24, 35);
        //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);
  
        // 마커를 생성합니다
        this.markers = [];``
        this.positions.forEach((position) => {
          var imageSrc;
          var markerImage;
          var imageSize = new kakao.maps.Size(24, 35);
          if(position.ctype == 39) imageSrc = "./음식점.png";
          else if(position.ctype == 12) imageSrc = "./관광지.png";
          else if(position.ctype == 32) imageSrc = "./숙박.png";
          else if(position.ctype == 38) imageSrc = "./쇼핑.png";
          else imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
            // 마커 이미지를 생성합니다
            //imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
          markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
          const marker = new kakao.maps.Marker({
            map: this.map, // 마커를 표시할 지도
            position: position.latlng, // 마커를 표시할 위치
            title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커의 이미지
            ctype: position.contentTypeId,
          });
          
          let content = 
          '<div class="overlayWrap" style="height:300px; width:250px; padding:10px;">' +
          '	 <div>'+				
          '    <img class="overlayImg" src='+position.img+' style="height:200px; width:100%"/>' +
          '    </div><div class="accommInfoWrap">' +
          '<div>'+
            '    <p3 class="accommName" style="font-size:18px;font-weight: 600;text-align:center;color:#00B98E;">'+position.title+'</p3>' +
          '      </div><div ><p class="accommRegion" style="font-size:12px;">'+position.add+'</p>'+
          '    </div></div>' +
          '    <div class="overlayArrow"></div>' +
          '</div>';
  
            // 마커에 표시할 인포윈도우를 생성합니다 
            var addwindow = new kakao.maps.InfoWindow({
              content: content, // 인포윈도우에 표시할 내용
              removable : true
            });
            
  
            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다 
            // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            kakao.maps.event.addListener(marker, 'mouseclick', this.makeclickListener(this.map, marker, addwindow));
            
          this.markers.push(marker);
        });
        console.log("마커수 ::: " + this.markers.length);
  
        // 4. 지도를 이동시켜주기
        // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
        const bounds = this.positions.reduce(
          (bounds, position) => bounds.extend(position.latlng),
          new kakao.maps.LatLngBounds()
        );
        this.map.setBounds(bounds);
  
  
      },
      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
      makeOverListener(map, marker, infowindow) {
          return function() {
            infowindow.open(map, marker);
        };
      },
       // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
      makeOutListener(infowindow) {
        return function() {
          infowindow.close();
      };
      },
      makeclickListener(map, marker, addwindow){
          // 마커에 클릭이벤트를 등록합니다
              kakao.maps.event.addListener(marker, 'click', function() {
                    // 마커 위에 인포윈도우를 표시합니다
                    addwindow.open(map, marker);  
              });
      },
      
      deleteMarker() {
        console.log("마커 싹 지우자!!!", this.markers.length);
        if (this.markers.length > 0) {
          this.markers.forEach((item) => {
            console.log(item);
            item.setMap(null);
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  #map {
    width: 100%;
    height: 700px;
  }
  </style>
  