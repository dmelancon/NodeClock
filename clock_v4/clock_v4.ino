#include <inttypes.h>
#include <Process.h>
Process nodejs;
int64_t mTime;                         //current time in seconds				
int mDuration, mHour, mMin, mSec, mTimeZone;         //arduino
int previousTimeZone, timeZoneChange;

float speedTime;
int hour, minute, sec, timeZone;            //from Server, sending to website

int currentIndex;
int64_t prevTime;


void setup() {
  Bridge.begin();
  Serial.begin(9600);

  //while (!Serial);
  
  // launch the echo.js script asynchronously:
  nodejs.runShellCommandAsynchronously("node /mnt/sda1/arduino/clockServer/server.js");

  //Serial.println("Started process");
  mTime = 0;
  hour = 0;
  minute = 0;
  sec = 0;
  timeZone = 0;
  mTimeZone = 0;
  previousTimeZone = mTimeZone;
  speedTime = 1;
  setTime();
  currentIndex = 0;
  prevTime = millis();
}

void loop() {
  if (nodejs.running()) {
      int inByte = nodejs.read();
    //  Serial.write(inByte);
      minute = mMin;
      hour = mHour;
      sec = mSec + 1;
      switch (inByte) {
        case'h':     // hour
          currentIndex = 1;
          break;
        case 'm':    // minute
          currentIndex = 2;
          break;
        case 's':    // speed
           currentIndex = 3;
          break;
        case 't':    // timezone
            currentIndex = 4;
          break;
        case 'x':    //fetch minute
            currentIndex = 5;
            break;
        case 'q':    //fetch hour
            currentIndex = 6;
            break;
        case 'w':    //fetch speed
            currentIndex = 7;
            break;   
        case 'y':    //fetch timezone
            currentIndex = 8;
            break;   
        case 'z':
            currentIndex = 9;
            break;   
      }
    if (currentIndex == 1){
      hour = nodejs.parseInt();
      timeZoneChange = 0;
      setTime(); 
    }
    if (currentIndex == 2){
      minute = nodejs.parseInt();
      setTime(); 
    }
    if (currentIndex == 3){
      speedTime = nodejs.parseInt();
      setTime(); 
    }
    if (currentIndex == 4){
      timeZone = nodejs.parseInt();
      timeZoneChange = timeZone - previousTimeZone;
      previousTimeZone = timeZone;
      //mTimeZone = timeZone;
      setTime(); 
    }
    if (currentIndex == 5){
      Serial.println("Minute requested!!!");
        nodejs.println(minute);
    }
    if (currentIndex == 6){
      Serial.println("Hour requested");
        nodejs.println(hour);
    }
    if (currentIndex == 7){
      Serial.println("Speed requested");
      nodejs.println(speedTime);
    }
    if (currentIndex == 8){
      Serial.println("Timezone requested!!!");
      nodejs.println(previousTimeZone);
    }
    if (currentIndex == 9){
      Serial.println("Still Connected");
      //nodejs.println(previousTimeZone);
    }
    currentIndex = 0;
    }
    stepTime(); 
}

void setTime(){
//  Serial.print("mTime before: ");
//  Serial.print((double)mTime);
  if ((timeZoneChange+hour)<0){
     mTime = (int64_t)(24+(timeZoneChange + hour))*60*60 + minute*60 + sec;
  }else{
    mTime = (int64_t)((timeZoneChange + hour)%24)*60*60 + minute*60 + sec; 
  }
//  Serial.print(", mTime after: ");
//  Serial.println((double)mTime);
  mDuration = 1000/speedTime;
}


void stepTime(){
   // Serial.println(time);
int64_t time = millis();
 if (mDuration > 0){
    if( (time-prevTime) > mDuration ) {
      calcTime();
      Serial.print(mHour);
      Serial.print(":");
      if(mMin<10) Serial.print(0); 
      Serial.print(mMin);
      Serial.print(":");
      if(mSec<10) Serial.print(0);
      Serial.println(mSec);
      mTime++;
      prevTime = time;
    }
  }
  if (mDuration < 0){
      if( (time-prevTime) > abs(mDuration) ) {
        //Serial.println("aahh");
        calcTime();
        Serial.print(mHour);
        Serial.print(":");
        if(mMin<10) Serial.print(0); 
        Serial.print(mMin);
        Serial.print(":");
        if(mSec<10) Serial.print(0);
        Serial.println(mSec);
        mTime--;
        prevTime = time;
      }
 }
}

void calcTime(){
  if (mTime == -1) mTime = ((int64_t)24*60*60 - 1);
  //Serial.println((double)mTime);
  mSec  = mTime%60;
  mMin  = ((mTime - mSec)/60)%60;
  mHour = ((((mTime - mSec)/60) - mMin)/60)%24;
}










