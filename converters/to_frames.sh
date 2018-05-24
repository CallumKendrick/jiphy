#!/bin/sh

echo $1

echo /frames/$1
mkdir /frames/$1

sudo ffmpeg -i $1 -vf scale=-1:480 /frames/$1/thumb%04d.jpg
