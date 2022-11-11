# -*- coding:utf-8 -*-
import pymysql
import matplotlib.pyplot as plt
import numpy as np
import math


def getSQL(key):
    return "select " + key + " as type, count(" + key + ") as value from jobs group by " + key + " order by value desc limit 8;"


def getData(query):
    print(query)
    db = pymysql.connect(host='127.0.0.1',
                         user='user',
                         password='user',
                         database='zhaopin')
    cursor = db.cursor()
    result = cursor.execute(query)
    data = list(cursor.fetchall())
    db.close()
    return data


def gemPic(key, data):
    plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
    plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号
    fig = plt.figure()
    ax = fig.add_axes([0, 0, 1, 1])
    ax.axis('equal')

    type = []
    value = []
    for d in data:
        if d[0]:
            type.append(d[0] + '(' + str(d[1]) + ')')
        else:
            type.append('其他' + '(' + str(d[1]) + ')')
        value.append(d[1])

    ax.pie(value, labels=type, autopct='%1.2f%%')
    plt.savefig("./output/pie-" + key + ".png")
    # plt.show()


def main():
    key = ['source', 'position', 'area', 'exp', 'education',
           'company_type', 'income', 'company_trade', 'company_financing']

    for k in key:
        query = getSQL(k)
        data = getData(query)
        gemPic(k, data)


main()
