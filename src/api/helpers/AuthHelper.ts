export function GetAuth(id: number) {
  var tokenDayane =
    "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIiwiY3R5IjoiSldUIn0.kR1LHk7Jt1cORyZSTB_XsPn0RggqWQezuk_qh2YYuDp1G6AGVfXXTA.eLxGFptrJ5sSX5TdIShdcg.4yfTQBZP7WeptroG2LUI736oV5s9y1AB6d_TQb3ZkTMnxnbpxSzwopr1JHPBu_A4bl-cC2a6L6T3AWkneZB_m8YjGLJTaJj1No5HeBhEWrGzxiopbY8YS47fcH_P3Rq7AsusrRrgGPOvHEFgeUyIe7TqVN0e5ttztdcjEb2QDGBj04e8oqxp8M8mYaBPOnP2VallQTQcURFDihNk7NsHTzeFJCfF4UzTSQFSsnNimIb1fs3vMh-l5Fwaw93Q7L42pq_b7ZBNhpHIjIGgJj3k0ZQ8HKipLeaBRl3maIJXcHiRcgv8EG9Hn6efStqjIOKBtidIa961C764qp2-sOr2Drz_zfz8ezap2s45A5cgeXw.nq3edpwOH7B7Id0CCWGuXw";
  var tokenDuarte =
    "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIiwiY3R5IjoiSldUIn0.Q6mur12Z7GyrOrovnZgelghBr5wEWaL4yOtF40hNXw7wl9i_rPu0tw.xkbEe8DeHH_2jmQ1U4exOw.eB894QyJn495RR5h1IK2UAnxhaB5Tyx_V5UH-LAvo7LabXluZ1jmCw8rrffFLdeW8AJtTvpqysBlYVZlaqUT7b3-lNGMVnuvZfAq5cihhAc40kMkZ-eQbFPnbchtukPgbS1tGF9c0eACBAfArMpykHicBHLNgoqIITKy-o9pr28JDJJic35sxYfQc87R1Aw8v86IO7_ysAbt46KCH7c0NWbvKuh0otYXBgOMyWaeXCi9kgSbfMUDqlMfWRvoAyhfqDHAJXWsvFvqrkOZKenb_0R3o0ImoKdriZh5rPp3bYroglZfVEvBsn7z8wu_05TwQXj1i93V8zLeXkfOWUFi0lX8SvzAs2q6_Nmch6taREc.xgjF8J_uOrZg370Mv9PkLw";

  return id == 1 ? tokenDuarte : tokenDayane;
}
