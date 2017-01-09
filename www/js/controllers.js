angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicPopup) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    // $ionicModal.fromTemplateUrl('templates/login.html', {
    //   scope: $scope
    // }).then(function (modal) {
    //   $scope.modal = modal;
    // });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    // $scope.doLogin = function () {
    //   console.log('Doing login', $scope.loginData);

    //   // Simulate a login delay. Remove this and replace with your login
    //   // code if using a login system
    //   $timeout(function () {
    //     $scope.closeLogin();
    //   }, 1000);
    // };
  })

  .controller('PlaylistsCtrl', function ($scope, $ionicPopup) {
    $scope.calcForm = {};
    $scope.fileSizeType = '2';
    $scope.calcForm.customMode = false;
    $scope.calcForm.bandwidthSpeedType = '1';

    $scope.update = function (s) {
      $scope.fileSizeType = s;
    };
    $scope.bandwidthSpeedTypeOnChange = function (e) {
      console.log(e);
      $scope.calcForm.bandwidthSpeedType = e;

    };

    $scope.calculate = function () {
      if ($scope.calcForm.fileSize == undefined) {
        $scope.calcForm.fileSize = 0;
        $scope.calcForm.customSpeedSize = 0;
      }

      $scope.clear();
    }

    function giveInt(x, divby) {
      newx = x / divby;
      tempx = Math.round(newx);
      if (x - divby * tempx < 0) tempx--;
      return tempx;
    }
    $scope.calctime = function () {
      var NetworkEfficiency = 100;
      var FileSize = $scope.calcForm.fileSize;
      var FileTransferSpeed = parseFloat($scope.calcForm.ccnctntype);


      // NetworkEfficiency = parseFloat(NetworkEfficiency);

      // // Check for reasonable values
      // if (isNaN(NetworkEfficiency)) {
      //     NetworkEfficiency = 100;
      //     form_obj.Efficiency.value = NetworkEfficiency;
      // }
      // else if (NetworkEfficiency > 100) {
      //     NetworkEfficiency = 100;
      //     form_obj.Efficiency.value = NetworkEfficiency;
      // }
      // else if (NetworkEfficiency < 0) {
      //     NetworkEfficiency = 0;
      //     form_obj.Efficiency.value = NetworkEfficiency;
      // }

      truespeed = (FileTransferSpeed * Math.pow(1000, /**/ 1) / 8) * (100 / 100);
      if ($scope.calcForm.customMode) {
        FileTransferSpeed = $scope.calcForm.customSpeedSize;
        truespeed = (FileTransferSpeed * Math.pow(1000, /**/ parseInt($scope.calcForm.bandwidthSpeedType)) / 8) * (100 / 100);
      }
      truefilesize = FileSize * Math.pow(2, 10 * $scope.fileSizeType /*3*/);
      if ($scope.calcForm.downloadPercent > 0) {
        var perceantegeVal = $scope.calcForm.downloadPercent / 100;

        truefilesize = truefilesize - (truefilesize * perceantegeVal);
      }

      // Check to see if caculated values are NAN
      if (isNaN(truespeed)) truespeed = 0;
      if (isNaN(truefilesize)) truefilesize = 0;

      if (truespeed != 0) seconds = truefilesize / truespeed;
      else seconds = 0;
      days = giveInt(seconds, 86400);
      seconds -= 86400 * days;
      hours = giveInt(seconds, 3600);
      seconds -= 3600 * hours;
      minutes = giveInt(seconds, 60);
      seconds -= 60 * minutes;
      seconds = Math.round(seconds * 100) / 100;

      // Check to see if caculated values are NAN
      if (isNaN(days)) days = 0;
      if (isNaN(hours)) hours = 0;
      if (isNaN(minutes)) minutes = 0;
      if (isNaN(seconds)) seconds = 0;

      $scope.ActualSpeed = Math.round(truespeed / 1024) + " Kbps";
      console.log($scope.ActualSpeed);
      var actualSpeed = $scope.ActualSpeed;
      // form_obj.FSBytes.value = Math.round(truefilesize) + " Bytes";
      console.log(Math.round(truefilesize / Math.pow(1024, 2)) + " MB");
      var downloadSize = Math.round(truefilesize / Math.pow(1024, 2)) + " MB";
      DStr = '';
      pset = false;
      if (days != 0) {
        DStr = days + ' days';
        pset = true;
      }
      if (hours != 0 || pset == true) {
        if (pset) { DStr += ', '; }
        DStr += hours + ' hours';
        pset = true;
      }
      if (minutes != 0 || pset == true) {
        if (pset) { DStr += ', '; }
        DStr += minutes + ' minutes';
        pset = true;
      }
      if (pset) DStr += ', ';

      DStr += seconds + ' seconds';
      // form_obj.DownloadTime.value = DStr;

      console.log(DStr);
      $scope.showAlert(DStr, actualSpeed, downloadSize);
    }



    $scope.setLevelText = function () {
      console.log($scope.calcForm.downloadPercent);
    }
    $scope.showAlert = function (DStr, actualSpeed, downloadSize) {
      var alertPopup = $ionicPopup.alert({
        title: 'Download Results',
        template: '<div> <h5>Remaining Time</h5>' + DStr + ' </br> <h5>Download Speed</h5> ' + actualSpeed + '</br><h5>Remaining Download Size</h5> ' + downloadSize + '</br></div>'
      });

      alertPopup.then(function (res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };

  }).controller('AboutCtrl', function ($scope, $ionicPopup) {

    // alert("ede");
  }).controller('ExitCtrl', function ($scope, $ionicPopup) {
    ionic.Platform.exitApp(); // stops the app
    window.close();
    // alert("ede");
  });
