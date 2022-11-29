# -*- coding:utf-8 -*-
import pymysql
import matplotlib.pyplot as plt
import numpy as np


def getSQL(key):
    return "select " + key + " as type, count(" + key + ") as value from jobs group by " + key + " order by value desc limit 8;"


def getData(query):
    print(query)
    db = pymysql.connect(host='127.0.0.1',
                         user='user',
                         password='useruser',
                         database='zhaopin')
    cursor = db.cursor()
    result = cursor.execute(query)
    data = list(cursor.fetchall())
    db.close()
    return data


def getColor():
    return ''


def gemPic(key, data):
    plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
    plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号
    fig, ax = plt.subplots()

    bar_colors = ['tab:red', 'tab:blue', 'tab:orange', 'tab:green',
                  'tab:pink', 'tab:purple', 'tab:brown', 'tab:cyan']
    category, value, labels, colors = [], [], [], []
    for d in data:
        i = data.index(d)
        category.append(d[0] if d[0] else '其他')
        value.append(d[1])
        labels.append(d[0])
        colors.append(bar_colors[i])

    ax.bar(category, value, label=labels, color=colors)

    ax.set_ylabel('数据量')
    ax.set_title('分类')
    ax.legend(title='信息源')

    plt.savefig("./output/bar-" + key + ".png")
    # plt.show()


def main():

    # key = ['source', 'position', 'exp', 'education',
    #        'company_type', 'income', 'company_trade', 'company_financing']
    key = ['source', 'education', 'income', 'company_trade']

    for k in key:
        query = getSQL(k)
        data = getData(query)
        gemPic(k, data)


main()
