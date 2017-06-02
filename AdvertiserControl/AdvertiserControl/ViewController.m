//
//  ViewController.m
//  AdvertiserControl
//
//  Created by Matt McInnes on 2/4/17.
//  Copyright © 2017 Matt McInnes. All rights reserved.
//

#import "ViewController.h"

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    // Do any additional setup after loading the view.
}
- (IBAction)fusionAd:(id)sender {
    
   // NSString *fusion = runCommand(@"ps -A | grep mysql");
    //[self runCommand:@"/Users/matt/Public/ChatX/ChatX-Server/socket.io/Adclient.js"];

    //system("/usr/local/bin/node /Users/matt/Public/ChatX/ChatX-Server/socket.io");
    NSString *node = @"/usr/local/bin/node /Users/matt/Public/ChatX/ChatX-Server/socket.io/Adclient.js";
    
    [self runCommand:node];
}
- (IBAction)imageDemo:(id)sender {
    NSString *node = @"/usr/local/bin/node /Users/matt/Public/ChatX/ChatX-Server/socket.io/image.js";
    
    [self runCommand:node];
}

- (void)runCommand:(NSString *)commandToRun
{
    NSTask *task;
    task = [[NSTask alloc] init];
    [task setLaunchPath: @"/bin/bash"];
    
    NSArray *arguments = [NSArray arrayWithObjects:
                          @"-c" ,
                          [NSString stringWithFormat:@"%@", commandToRun],
                          nil];
    NSLog(@"run command: %@",commandToRun);
    [task setArguments: arguments];
    [task launch];

    NSPipe *pipe;
    pipe = [NSPipe pipe];
    [task setStandardOutput: pipe];
    
    NSFileHandle *file;
    file = [pipe fileHandleForReading];
    

    NSData *data;
    data = [file readDataToEndOfFile];
    //[task terminate];

    NSString *output;
    output = [[NSString alloc] initWithData: data encoding: NSUTF8StringEncoding];
    NSLog(@"output %@",output);
    [task terminate];
}

- (void)setRepresentedObject:(id)representedObject {
    [super setRepresentedObject:representedObject];

    // Update the view, if already loaded.
}


@end
