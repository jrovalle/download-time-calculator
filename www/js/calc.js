
	<!--

    /*
	
    Download Time Calculator 1.3.1
    Copyright (C) 2005 Azalea Technology, LLC.
	
    Based on original software:
    Copyright (C) 1997-99 Grahame Bowland
    http://is.asu.edu/r&d/video/dltime.html
	
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.
	
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
	
    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
	
    */

    function giveInt(x, divby) {
        newx = x / divby;
        tempx = Math.round(newx);
        if (x - divby * tempx < 0) tempx--;
        return tempx;
    }

function CalcTime(calcForm) {

    var NetworkEfficiency = 100;
    var FileSize = $scope.calcForm.fileSize;
    var FileTransferSpeed = $scope.calcForm.ccnctntype;

    // Remove any commas in the file size
    if (!isNaN(parseFloat(FileSize))) {
        FileSize = FileSize.replace(/,/g, "");
        form_obj.FileSize.value = FileSize;
    }

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

    truespeed = (FileTransferSpeed * Math.pow(1000, form_obj.TransferRateUnits.selectedIndex) / 8) * (100 / 100);
    truefilesize = FileSize * Math.pow(2, 10 * form_obj.FileUnits.selectedIndex);

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

    $scope.ActualSpeed = (Math.round((truespeed / 1024) * 100) / 100) + " KBps";
    console.log($scope.ActualSpeed);
    // form_obj.FSBytes.value = Math.round(truefilesize) + " Bytes";
    console.log(form_obj.FSBytes.value = Math.round(truefilesize) + " Bytes");
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
    form_obj.DownloadTime.value = DStr;

    console.log(DStr)
}

	// -->
