'use strict'
angular.module('hamiltonApp')
  .controller('PlateCtrl', function ($scope) {
    
  var boxX = 0;
  var boxY = 0;
  var box = '<div class="box" />';
  
  for(var i = 0; i<8;i++){
    for(var j = 0; j<12; j++) {
      $('#grid').append(box);
    }
  }
  
  $('.box').on('click',function(){
  boxX = $(this).position().left;
  boxY = $(this).position().top;
  $(this).text('Sample='+ boxX +' , Y='+ boxY);
  });
  });
  
