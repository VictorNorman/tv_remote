import { Component } from '@angular/core';
import { SSHConnect } from '@ionic-native/ssh-connect/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public buttonMsg = 'Record';
  private audioFile: MediaObject = null;

  constructor(private sshConnect: SSHConnect, private media: Media, private file: File) {
    this.audioFile = this.media.create(this.file.externalRootDirectory + '/audioFile.mp3');
  }

  async toggleOnOff() {
    this.sendCommand('irsend send_once JVC_RMT-JC02 KEY_POWER');
  }

  closedCaptioningOn() {
    this.sendCommand('sh cc_on.sh');
  }
  closedCaptioningOff() {
    this.sendCommand('sh cc_off.sh');
  }
  toggleMute() {
    this.sendCommand('irsend send_once JVC_RMT-JC02 KEY_MUTE');
  }

  volumeUp() {
    this.sendCommand('irsend send_once JVC_RMT-JC02 KEY_VOLUMEUP');
  }

  volumeDown() {
    this.sendCommand('irsend send_once JVC_RMT-JC02 KEY_VOLUMEDOWN');
  }

  channelUp() {
    this.sendCommand('irsend send_once JVC_RMT-JC02 KEY_CHANNELUP');
  }
  channelDown() {
    this.sendCommand('irsend send_once JVC_RMT-JC02 KEY_CHANNELDOWN');
  }

  goToCh8() {
    this.sendCommand('irsend send_once JVC_RMT-JC02 KEY_8');
  }
  goToCW() {
    this.sendCommand('sh cw.sh');
  }
  goToDabl() {
    this.sendCommand('sh dabl.sh');
  }
  goToQuest() {
    this.sendCommand('sh quest.sh');
  }

  toggleRecordingAudio() {
    console.log('recording...');

    if (this.buttonMsg === 'Record') {
      this.audioFile.startRecord();
       this.buttonMsg = 'Stop';
    } else {
      this.audioFile.stopRecord();
      this.buttonMsg = 'Record';
    }
  }

  private async sendCommand(cmd: string) {
    try {
      let resp = await this.sshConnect.connect('pi', '1', '192.168.2.219', 22);
      console.log(resp);
      resp = await this.sshConnect.executeCommand(cmd);
      console.log(resp);
      resp = this.sshConnect.disconnect();
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  }
}
