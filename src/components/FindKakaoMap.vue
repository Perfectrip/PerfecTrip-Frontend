<template>
    <div>
      <div id="map"></div>
    </div>
  </template>
  
  <script>
  import axios from "axios";

  export default {
    name: "FindKakaoMap",
    components: {},
    data() {
      return {
        map: null,
        positions: [],
        markers: [],
        start: {},
        end: {},
        route: [],
        result: '',
      };
    },
    props: {
      locations: [],
    },
    watch: {
  },
    created() {
        console.log("장소", this.locations);
        this.positions = [];
        this.start.name = this.locations[0].id;
        this.start.x = this.locations[0].lng;
        this.start.y = this.locations[0].lat;
        const len = this.locations.length;
        this.end.x = this.locations[len-1].lng;
        this.end.y = this.locations[len - 1].lat;
        this.end.name = this.locations[len - 1].id;
        const arr = this.locations.slice(1, len-1);
        arr.forEach((loc) => {
            let obj = {};
            obj.x = loc.lng;
            obj.y = loc.lat;
            obj.name = loc.id;
            this.positions.push(obj);
            }),
      this.loadApi();
    },
    mounted() {
      // api 스크립트 소스 불러오기 및 지도 출력
      if (window.kakao && window.kakao.maps) {
            this.loadMap();
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
                "origin": this.start,
                "destination": this.end,
                "waypoints": this.positions,
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
                //console.log(arg)
                //경로 저장
                this.route.push(summary.origin.name);
                summary.waypoints.forEach((way) => {
                    this.route.push(way.name);
                });
                this.route.push(summary.destination.name);
                console.log(this.route);
                //경로 문자열 변환
                this.route.forEach((loc) => {
                    this.result = this.result+ '-' + String(loc);
                });
                this.result = this.result.substring(1);
                console.log('emit으로 보냄', this.result);
                this.$emit('way_list', this.result);
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
                    let imageSize = new window.kakao.maps.Size(55, 55);
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
          level: 13,
        };
  
        this.map = new window.kakao.maps.Map(container, options);
        //   this.loadMaker();
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
    },
  };
  </script>
  
  <style scoped>
  #map {
    width: 100%;
    height: 700px;
  }
  </style>
  