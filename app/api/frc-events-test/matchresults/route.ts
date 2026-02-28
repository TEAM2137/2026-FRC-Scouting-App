import { NextRequest, NextResponse } from 'next/server';


const data = {
  "Matches": [
    {
      "actualStartTime": "2020-03-06T10:11:35.9",
      "tournamentLevel": "Qualification",
      "postResultTime": "2020-03-06T10:14:53.597",
      "description": "Qualification 9",
      "matchNumber": 9,
      "scoreRedFinal": 85,
      "scoreRedFoul": 0,
      "scoreRedAuto": 34,
      "scoreBlueFinal": 72,
      "scoreBlueFoul": 0,
      "scoreBlueAuto": 27,
      "teams": [
        {
          "teamNumber": 3139,
          "station": "Red1",
          "dq": false
        },
        {
          "teamNumber": 7577,
          "station": "Red2",
          "dq": false
        },
        {
          "teamNumber": 3959,
          "station": "Red3",
          "dq": false
        },
        {
          "teamNumber": 3937,
          "station": "Blue1",
          "dq": false
        },
        {
          "teamNumber": 3039,
          "station": "Blue2",
          "dq": false
        },
        {
          "teamNumber": 3616,
          "station": "Blue3",
          "dq": false
        }
      ]
    },
    {
      "actualStartTime": "2020-03-06T11:01:12.033",
      "tournamentLevel": "Qualification",
      "postResultTime": "2020-03-06T11:06:37.803",
      "description": "Qualification 15",
      "matchNumber": 15,
      "scoreRedFinal": 229,
      "scoreRedFoul": 90,
      "scoreRedAuto": 35,
      "scoreBlueFinal": 103,
      "scoreBlueFoul": 3,
      "scoreBlueAuto": 38,
      "teams": [
        {
          "teamNumber": 1421,
          "station": "Red1",
          "dq": false
        },
        {
          "teamNumber": 4635,
          "station": "Red2",
          "dq": false
        },
        {
          "teamNumber": 4959,
          "station": "Red3",
          "dq": false
        },
        {
          "teamNumber": 4265,
          "station": "Blue1",
          "dq": false
        },
        {
          "teamNumber": 3139,
          "station": "Blue2",
          "dq": false
        },
        {
          "teamNumber": 3039,
          "station": "Blue3",
          "dq": false
        }
      ]
    },
    {
      "actualStartTime": "2020-03-06T11:55:40.923",
      "tournamentLevel": "Qualification",
      "postResultTime": "2020-03-06T11:58:45.79",
      "description": "Qualification 21",
      "matchNumber": 21,
      "scoreRedFinal": 101,
      "scoreRedFoul": 0,
      "scoreRedAuto": 36,
      "scoreBlueFinal": 54,
      "scoreBlueFoul": 0,
      "scoreBlueAuto": 38,
      "teams": [
        {
          "teamNumber": 7910,
          "station": "Red1",
          "dq": false
        },
        {
          "teamNumber": 3039,
          "station": "Red2",
          "dq": false
        },
        {
          "teamNumber": 4087,
          "station": "Red3",
          "dq": false
        },
        {
          "teamNumber": 6055,
          "station": "Blue1",
          "dq": false
        },
        {
          "teamNumber": 7767,
          "station": "Blue2",
          "dq": false
        },
        {
          "teamNumber": 2221,
          "station": "Blue3",
          "dq": false
        }
      ]
    },
    {
      "actualStartTime": "2020-03-06T14:53:35.373",
      "tournamentLevel": "Qualification",
      "postResultTime": "2020-03-06T14:56:31.633",
      "description": "Qualification 37",
      "matchNumber": 37,
      "scoreRedFinal": 82,
      "scoreRedFoul": 0,
      "scoreRedAuto": 22,
      "scoreBlueFinal": 87,
      "scoreBlueFoul": 15,
      "scoreBlueAuto": 31,
      "teams": [
        {
          "teamNumber": 6586,
          "station": "Red1",
          "dq": false
        },
        {
          "teamNumber": 4576,
          "station": "Red2",
          "dq": false
        },
        {
          "teamNumber": 3250,
          "station": "Red3",
          "dq": false
        },
        {
          "teamNumber": 3039,
          "station": "Blue1",
          "dq": false
        },
        {
          "teamNumber": 6840,
          "station": "Blue2",
          "dq": false
        },
        {
          "teamNumber": 2333,
          "station": "Blue3",
          "dq": false
        }
      ]
    },
    {
      "actualStartTime": "2020-03-06T15:39:25.71",
      "tournamentLevel": "Qualification",
      "postResultTime": "2020-03-06T15:45:17.063",
      "description": "Qualification 42",
      "matchNumber": 42,
      "scoreRedFinal": 76,
      "scoreRedFoul": 0,
      "scoreRedAuto": 28,
      "scoreBlueFinal": 41,
      "scoreBlueFoul": 3,
      "scoreBlueAuto": 10,
      "teams": [
        {
          "teamNumber": 3039,
          "station": "Red1",
          "dq": false
        },
        {
          "teamNumber": 364,
          "station": "Red2",
          "dq": false
        },
        {
          "teamNumber": 4336,
          "station": "Red3",
          "dq": false
        },
        {
          "teamNumber": 6186,
          "station": "Blue1",
          "dq": false
        },
        {
          "teamNumber": 3991,
          "station": "Blue2",
          "dq": false
        },
        {
          "teamNumber": 8043,
          "station": "Blue3",
          "dq": false
        }
      ]
    },
    {
      "actualStartTime": "2020-03-06T16:48:33.693",
      "tournamentLevel": "Qualification",
      "postResultTime": "2020-03-06T16:51:39.877",
      "description": "Qualification 49",
      "matchNumber": 49,
      "scoreRedFinal": 117,
      "scoreRedFoul": 0,
      "scoreRedAuto": 37,
      "scoreBlueFinal": 104,
      "scoreBlueFoul": 0,
      "scoreBlueAuto": 41,
      "teams": [
        {
          "teamNumber": 7483,
          "station": "Red1",
          "dq": false
        },
        {
          "teamNumber": 3039,
          "station": "Red2",
          "dq": false
        },
        {
          "teamNumber": 6055,
          "station": "Red3",
          "dq": false
        },
        {
          "teamNumber": 2393,
          "station": "Blue1",
          "dq": false
        },
        {
          "teamNumber": 5729,
          "station": "Blue2",
          "dq": false
        },
        {
          "teamNumber": 2992,
          "station": "Blue3",
          "dq": false
        }
      ]
    },
    {
      "actualStartTime": "2020-03-06T18:26:01.11",
      "tournamentLevel": "Qualification",
      "postResultTime": "2020-03-06T18:29:36.787",
      "description": "Qualification 60",
      "matchNumber": 60,
      "scoreRedFinal": 79,
      "scoreRedFoul": 15,
      "scoreRedAuto": 33,
      "scoreBlueFinal": 116,
      "scoreBlueFoul": 30,
      "scoreBlueAuto": 24,
      "teams": [
        {
          "teamNumber": 5437,
          "station": "Red1",
          "dq": false
        },
        {
          "teamNumber": 7908,
          "station": "Red2",
          "dq": false
        },
        {
          "teamNumber": 6640,
          "station": "Red3",
          "dq": false
        },
        {
          "teamNumber": 7702,
          "station": "Blue1",
          "dq": false
        },
        {
          "teamNumber": 7878,
          "station": "Blue2",
          "dq": false
        },
        {
          "teamNumber": 3039,
          "station": "Blue3",
          "dq": false
        }
      ]
    },
    {
      "actualStartTime": "2020-03-07T09:53:49.97",
      "tournamentLevel": "Qualification",
      "postResultTime": "2020-03-07T09:56:55.857",
      "description": "Qualification 71",
      "matchNumber": 71,
      "scoreRedFinal": 70,
      "scoreRedFoul": 0,
      "scoreRedAuto": 43,
      "scoreBlueFinal": 50,
      "scoreBlueFoul": 3,
      "scoreBlueAuto": 22,
      "teams": [
        {
          "teamNumber": 2221,
          "station": "Red1",
          "dq": false
        },
        {
          "teamNumber": 537,
          "station": "Red2",
          "dq": false
        },
        {
          "teamNumber": 3039,
          "station": "Red3",
          "dq": false
        },
        {
          "teamNumber": 7868,
          "station": "Blue1",
          "dq": false
        },
        {
          "teamNumber": 1912,
          "station": "Blue2",
          "dq": false
        },
        {
          "teamNumber": 4330,
          "station": "Blue3",
          "dq": false
        }
      ]
    },
    {
      "actualStartTime": "2020-03-07T11:07:29.37",
      "tournamentLevel": "Qualification",
      "postResultTime": "2020-03-07T11:10:51.16",
      "description": "Qualification 80",
      "matchNumber": 80,
      "scoreRedFinal": 136,
      "scoreRedFoul": 15,
      "scoreRedAuto": 50,
      "scoreBlueFinal": 126,
      "scoreBlueFoul": 30,
      "scoreBlueAuto": 29,
      "teams": [
        {
          "teamNumber": 3039,
          "station": "Red1",
          "dq": false
        },
        {
          "teamNumber": 8043,
          "station": "Red2",
          "dq": false
        },
        {
          "teamNumber": 6855,
          "station": "Red3",
          "dq": false
        },
        {
          "teamNumber": 7467,
          "station": "Blue1",
          "dq": false
        },
        {
          "teamNumber": 16,
          "station": "Blue2",
          "dq": false
        },
        {
          "teamNumber": 7798,
          "station": "Blue3",
          "dq": false
        }
      ]
    }
  ]
}

export async function GET(req: NextRequest) {
    return NextResponse.json(data);
}