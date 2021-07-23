<template>
  <div class="scale">
    <div class="site-box">
      <h6>Site A</h6>
    </div>
    <header class="scale_header">
      <h6>
        Площадка {{station_data.name}}
      </h6>
      <div class="scale-address">
        <p class="m-0">{{ stAddress().street }}, {{ stAddress().house }}</p>
        <p>{{ stAddress().district }}, {{ stAddress().city }}</p>
      </div>
      <div class="scale-location">
        <svg width="22" height="22">
          <use xlink:href="@/assets/location/outdoor.svg#outdoor"> </use>
        </svg>
      </div>
      <div class="scale-location__coords" >
        <span v-for="coord in stCoords()" :key='coord'> {{ coord }} </span>
      </div>
    </header>
    <main>
      <section >
        <div class="scale-container position-relative">
          <div class="scale-height position-relative">

            <svg class="scale-line">
              <use xlink:href="@/assets/scale.svg#scale"> </use>
            </svg>
            <div class="amc-height">
              <p>0м AMC</p>
              <span class="position-absolute"></span>
            </div>
            <div class="antenna-height">
              <p>0м</p>
              <span class="position-absolute"></span>
            </div>
          </div>
          
          <div class="station">
            <hr class="dashed-line w-100 antenna-height" />
            <hr class="dashed-line w-100 amc-height" />
            <div class="antennas-container">
              <div class="antennas" style="background: #11DF71"></div>
              <div class="antennas" style="background: #FFB932"></div>
              <div class="antennas" style="background: #BAB9FF"></div>
            </div>
            <svg class="station-head skelet">
              <use xlink:href="@/assets/stationhead.svg#station-head"> </use>
            </svg>

            <svg class="station-body skelet">
              <use xlink:href="@/assets/stationbody.svg#station-body"> </use>
            </svg>

            <svg class="station-base h-1 skelet">
              <use xlink:href="@/assets/stationbase.svg#station-base"> </use>
            </svg>
          </div>

        </div>
      </section>

      <section class="sector-data">
        <div class="amount">
          <div class="d-flex">
            <div class="amount__circle"></div>
            <div class="amount__circle"></div>
            <div class="amount__circle"></div>
            <div class="amount__circle"></div>
          </div>
          <div class="space-between__text"> 
            <span>...</span>
            <span>0/0</span>
          </div>
        </div>
        <div class="legends">
          <div class="sector">
            <div class="sector-circle">
              <svg width="20" height="20" class="sector-circle__item" @click="get_sectordata(1)">
                <use xlink:href="@/assets/legends/green.svg#green"></use>
              </svg>
              <svg id="yelllowsector" width="20" height="20" class="sector-circle__item" @click="get_sectordata(2)">
                <use xlink:href="@/assets/legends/yellow.svg#yellow"></use>
              </svg>
              <svg id="purplesector" width="20" height="20" class="sector-circle__item" @click="get_sectordata(3)">
                <use xlink:href="@/assets/legends/purple.svg#purple"></use>
              </svg>
            </div>
          </div>

          <span class="sector-number" >Сектор {{sectorNumber}}</span>
          <div class="sector-symbols">
            <div class="sector-symbols__value space-between__text">
              <svg width="11" height="11">
                <use xlink:href="@/assets/legends/degree.svg#degree"></use>
              </svg>
              <span>{{ azimuth.value === undefined ? '0' : azimuth.value }}.0°</span>
            </div>
            <div class="sector-symbols__value space-between__text">
              <svg width="11" height="11">
                <use xlink:href="@/assets/legends/triangle.svg#triangle"></use>
              </svg>
              <span>{{ tiltAngle.value === undefined ? '0' : tiltAngle.value }}.0°</span>
            </div>
            <div class="sector-symbols__value space-between__text">
              <svg width="11" height="11">
                <use xlink:href="@/assets/legends/ibeams.svg#ibeams"></use>
              </svg>
              <span>{{ mountHeight.value === undefined ? '0' : mountHeight.value }} m</span>
            </div>
          </div>
          <div class="network">
            <div class="network__item" v-for="item in network" :key="item">{{ item }}</div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data(){
    return {
      sectorNumber:'...',
      active: false,
      station_data: {},
      sector_data: {},
      // sector_characteristic: {},
      mountHeight: 0,
      tiltAngle: 0,
      azimuth: 0,
      network:['2G','3G','LTE','5G']
    }
  },
  methods:{
    get_sectordata(item){
      console.log(document.querySelectorAll(".network__item"));
      this.sectorNumber = `${item}`;
      this.active = true;
      document.querySelector(".antennas-container").style.display = 'flex';
      document.querySelectorAll(".skelet").forEach(e => {
        e.style.opacity = '1'; 
        e.style.strokeDasharray = '0'
      });

      this.get_station_data(item, (data) => {
        console.log(data);
        this.sector_data = data;
        this.mountHeight = {...data.resourceCharacteristic.filter( e => e.name === "mountHeight")[0]};
        this.tiltAngle = {...data.resourceCharacteristic.filter( e => e.name === "tiltAngle")[0]};
        this.azimuth = {...data.resourceCharacteristic.filter( e => e.name === "azimuth")[0]};
      });
    },

    get_station_data(station_id, cb) {
      fetch(`
        http://localhost:3000/station/${station_id}
      
      `).then(res => {
        return res.json();
      
      }).then(data => {
        cb(data);
        return data;
      
      }).catch((error) => {
        console.error(error);
      });
    },

    stCoords(){
      try {
        let coords = [],
            lat = this.station_data.resourceCharacteristic.filter( e => e.name === "latitude" )[0],
            lon = this.station_data.resourceCharacteristic.filter( e => e.name === "longitude" )[0];
        coords.push(lat.value,lon.value)
        return coords
      }catch(err){
        console.log(err);
      }
    },

    stAddress(){
      try {
        // разбираем полный адрес станции
        let addressArray = {...this.station_data.resourceCharacteristic.filter( e => e.name === "siteAddress")[0].value.split(',')};
        let dataArray = {};
        dataArray['district'] = addressArray[0].trim();
        dataArray['city'] = addressArray[1].trim('.');
        dataArray['street'] = addressArray[2].trim();
        dataArray['house'] = addressArray[3].trim();
        let result = dataArray;
        return result;
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed:{
    // mountHeight(){
    //   let result = this.sector_characteristic.filter( e => e.name === "mountHeight");
    //   return result;
    // }
  },

  created(){
    this.get_station_data(100, data => {
      this.station_data = data;
    });
  },

  mounted(){
    // this.station_data = this.get_station_data(100);
  },
}
</script>

<style >
.site-box {
  color: #fff;
  position: absolute;
  width: 71px;
  height: 30px;
  background: #2C2C2C;
}
.site-box > h6 {
  margin: 8px 16px;
  font-size: 11px;
}
.scale {
  display: flex;
  height: 381px;
  width: 505px;
  border: 1px solid #2C2C2C;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px; /* временно */
}
.scale_header {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(2, 30px);
  margin: 56px 0 15px 25px;
}
.scale-address > p {
  font-size: 11px;
  grid-row: 2;
}
.scale-location {
  display: flex;
  justify-content: flex-end;
  margin-right: 25px;
  grid-column: 2;
  grid-row: 1;
}
.scale-location__coords {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 11px;
  margin-right: 25px;
  grid-row: 2;
  grid-column: 2;
}
.scale-container {
  display: flex;
  margin: 0 0 20px 25px;
  font-size: 8px;
}
.scale-height {
  width: 68px;
}
.scale-height > div {
  display: inline-flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
  width: 100%;
  position: absolute;
}
.antenna-height {
  bottom: 77%;
}
.amc-height {
  bottom: 97%;
}
.scale-height > div > p {
  margin: 0 0 0px 5px;
}
.scale-height > div > span { 
  font-size: 8px;
  line-height: 10px;
  background: black;
  width: 4px;
  height: 2px;
  border-radius: 33%;
}
.scale-line{
  position: relative;
  height: 225px;
  width: 2px;
}
.station {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 270px;
}
.antennas-container{
  position: absolute;
  top: 4%;
  display: none;
  justify-content: space-between;
  width: 62px;
  height: 20px;
}
.antennas {
  height: 20px;
  width: 10px;
  border: 1px solid #1D1D1D;
  border-radius: 2px;
  z-index: 10;

}
.station-body{
  display: block;
}
.station-head{
  height: 62px;
  width: 55px;
}
.station-body{
  height: 159px;
  width: 114px;
}
.station-base{
  height: 7px;
  width: 205px;
}
.skelet{
  opacity: 0.3;
  stroke-dasharray: 2 5;
}


main {
  display: grid;
  grid-template-columns: 58% 42%;
}
.dashed-line {
  position: absolute;
  margin: 5px;
  background: repeating-linear-gradient(90deg,#000,#000 6px,transparent 6px,transparent 12px);
}
.sector-data {
  display: grid;
  grid-template-rows: 17% 57% 26%;
  grid-template-columns: 100%;
  font-size: 11px;
  margin: 20px 25px 0px 27px;
}
.sector-symbols{
  grid-row: 2;
  grid-column: 2;
}
.sector-circle {
  position: relative;
  border-radius: 50%;
  background: #11DF71;
  width: 8px;
  height: 8px;
  margin: 18px;
}
.sector-circle__item {
  position: absolute;
  bottom: 0;
  right: 25%;
  cursor: pointer;
  opacity: 0.3;
}
.sector-circle__item:hover {
  transform: scale(1.2);
  stroke: #2C2C2C;
  opacity: 1;
  right: 87%;
  bottom: 28%;
  transition: 0.3s;
}

#purplesector {
  left: 47%;
  bottom: -11%;
}
#purplesector:hover {
  left: 118%;
  bottom: 5%;
}
#yelllowsector {
  left: -52%;
  bottom: 36%;
}
#yelllowsector:hover{
  left: -43%;
  bottom: 102%;
}

.amount__circle {
  border-radius: 50%;
  background: #EAEAEA;
  width: 8px;
  height: 8px;
  margin-left: 5px;
}
.space-between__text {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.legends {
  display: grid;
  grid-template-columns: 43% 57%;
  grid-template-rows: 19px 57px 30px 32px;
  margin-top: 30px;
}
.network {
  display: flex;
  grid-row: 4;
}
.network > div {
  font-size: 14px;
  color: #fff;
  background: #EAEAEA;
  padding: 6px 11px;
  margin-left: 2px;
}
</style>