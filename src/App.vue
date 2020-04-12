<template>
  <div id="app">
    <input id="keyword" type="textbox" value="酒店">
    <Button @click="searchKeyword()">search</Button>
    <div id="container"></div>
    <div style='width: 500px; height: 180px' id="infoDiv">654</div>
  </div>
</template>
<script>
export default {
  mounted() {
    const center = new qq.maps.LatLng(39.916527, 116.397128);
    this.map = new qq.maps.Map(document.getElementById('container'), {
      center, // 地图的中心地理坐标。
      zoom: 8, // 地图的中心地理坐标。
    });
    var latlngBounds = new qq.maps.LatLngBounds();
    const marker = new qq.maps.Marker({
      position: center,
      map:this.map,
    });
    //添加到提示窗
    var info = new qq.maps.InfoWindow({
        map: this.map
    });
     qq.maps.event.addListener(marker, 'click', function() {
        info.open(); 
        info.setContent('<div style="text-align:center;white-space:nowrap;'+
        'margin:10px;">单击标记</div>');
        info.setPosition(center); 
    });
    var self=this;
    this.searchService=new qq.maps.SearchService({
                //设置搜索范围为北京
                location: "北京",
                //设置搜索页码为1
                pageIndex: 1,
                //设置每页的结果数为5
                pageCapacity: 5,
                //设置展现查询结构到infoDIV上
                panel: document.getElementById('infoDiv'),
                //设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
                autoExtend: true,
                //检索成功的回调函数
                complete: function(results) {
                    //设置回调函数参数
                    var pois = results.detail.pois;
                    for (var i = 0, l = pois.length; i < l; i++) {
                        var poi = pois[i];
                        //扩展边界范围，用来包含搜索到的Poi点
                        latlngBounds.extend(poi.latLng);
                        var marker = new qq.maps.Marker({
                            map: self.map,
                            position: poi.latLng
                        });

                        marker.setTitle(i + 1);

                        self.markers.push(marker);

                    }
                    //调整地图视野
                    self.map.fitBounds(latlngBounds);
                },
                //若服务请求失败，则运行以下函数
                error: function() {
                    alert("出错了。");
                }
            });
  },
  data() {
    return {
      map:null,
      searchService : [],
      markers : []
    }
  },
  methods: {
    clearOverlays(overlays) {
                var overlay;
                while (overlay = overlays.pop()) {
                    overlay.setMap(null);
                }
            },
    searchKeyword() {
                var keyword = document.getElementById("keyword").value;
                this.clearOverlays(this.markers);
                //根据输入的城市设置搜索范围
                // searchService.setLocation("北京");
                //根据输入的关键字在搜索范围内检索
                this.searchService.search(keyword);
            }
  },
};
</script>
<style lang="less">
#app {
  width:600px;
  height:500px;
  margin:100px auto;
  input {
    width:350px;
  }
  #container{
    width:600px;
    height:400px;
    margin:auto;
    border: 1px solid #000;
  }
}
</style>
