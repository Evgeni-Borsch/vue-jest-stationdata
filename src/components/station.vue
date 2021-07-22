<template>
  <div class="scale">
    <div class="site-box">
      <svg width="40" height="11" class="siteA">
        <use xlink:href="@/assets/siteA.svg#siteA"> </use>
      </svg>
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
      <div class="scale-location__coords">
        <span v-for="coord in stCoords()" :key='coord'> {{ coord }} </span>
      </div>
    </header>
    <main>
      <section>
        <div class="scale_container">
          <div>
            <svg class="scale__line w-1">
              <use xlink:href="@/assets/scale.svg#scale"> </use>
            </svg>
          </div>
          <div class="station">
            <svg class="station-head">
              <use xlink:href="@/assets/stationhead.svg#station-head"> </use>
            </svg>

            <svg class="station-body">
              <use xlink:href="@/assets/stationbody.svg#station-body"> </use>
            </svg>

            <svg class="station-base h-1">
              <use xlink:href="@/assets/stationbase.svg#station-base"> </use>
            </svg>
          </div>
        </div>
      </section>

      <section class="sector-data">
        <div class="amount">
          <div class="d-flex">
            <div class="amount__circle mr-1"></div>
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
              <svg width="20" height="20" class="sector-circle__item">
                <use xlink:href="@/assets/legends/green.svg#green"></use>
              </svg>
              <svg id="yelllowsector" width="20" height="20" class="sector-circle__item">
                <use xlink:href="@/assets/legends/yellow.svg#yellow"></use>
              </svg>
              <svg id="purplesector" width="20" height="20" class="sector-circle__item">
                <use xlink:href="@/assets/legends/purple.svg#purple"></use>
              </svg>
            </div>
          </div>

          <span class="sector-number">Сектор ...</span>
          <div class="sector-symbols">
            <div class="sector-symbols__value space-between__text">
              <svg width="11" height="11">
                <use xlink:href="@/assets/legends/degree.svg#degree"></use>
              </svg>
              <span>0.0°</span>
            </div>
            <div class="sector-symbols__value space-between__text">
              <svg width="11" height="11">
                <use xlink:href="@/assets/legends/triangle.svg#triangle"></use>
              </svg>
              <span>0.0°</span>
            </div>
            <div class="sector-symbols__value space-between__text">
              <svg width="11" height="11">
                <use xlink:href="@/assets/legends/ibeams.svg#ibeams"></use>
              </svg>
              <span>25m</span>
            </div>
          </div>
          <div class="network">
            <div>2G</div>
            <div>3G</div>
            <div>LTE</div>
            <div>5G</div>
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
      station_data: null
    }
  },
  methods:{
    async get_station_data(station_id) {
      try {
        let res = await fetch(`
           http://localhost:3000/station/${station_id}
        `);
        if (res.ok) { 
          let data = await res.json();
          return data;
        } else {
          console.error("Ошибка HTTP: " + res.status);
        }
      } catch(err){
        console.log(err);
      }
    },
    stCoords(){
      try {
        if(null === this.station_data){
          return;
        }
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
        if(null === this.station_data){
          return;
        }
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
  },

  created(){
  },

  async mounted(){
    this.station_data = await this.get_station_data(100);
  },
}
</script>

<style scoped>
.site-box {
  position: absolute;
  width: 71px;
  height: 30px;
  background: #2C2C2C;
}
.siteA{
  position: absolute;
  left: 15px;
  top: 9px;
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
  margin: 56px 0 0 25px;
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
.scale_container {
  display: flex;
  margin: 0 0 20px 25px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}
.scale__line{
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
.station-head, .station-body, .station-base {
  display: block;
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
main {
  display: grid;
  grid-template-columns: 58% 42%;
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
  z-index: 10;
}
.sector-circle__item {
  position: absolute;
  bottom: 0;
  right: 25%;
  z-index: 1;
  cursor: pointer;
}
.sector-circle__item:hover {
  stroke: #2C2C2C;
}

#purplesector {
  left: 47%;
  bottom: -11%;}
#yelllowsector {
  left: -52%;
  bottom: 36%;
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