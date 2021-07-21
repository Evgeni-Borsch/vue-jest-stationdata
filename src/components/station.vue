<template>
  <div class="scale">
      <div class="site-box">
        <svg class="siteA">
        <use xlink:href="@/assets/siteA.svg#siteA"> </use>
      </svg>
      </div>
    <header class="scale_header">
      <h6>
        Площадка...
      </h6>
      <div class="scale-address">
        <p class="m-0">пр. Маршала Жукова, 55</p>
        <p>Ленинградская обл., г. Санкт-Петербург</p>
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
      <section class="data">

      </section>
    </main>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.site-box{
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
.scale_header{
  margin: 56px 0  0 25px;
}
.scale-address > p {
  font-size: 11px;
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

</style>