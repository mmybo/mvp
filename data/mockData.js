const products = [
    {
        _id: 1,
        name: 'Xbox 360',
        description: 'I want an Xbox 360 so please if you have one please message me so we can discuss price.',
        requirements: ['Relatively new condition', 'Still works', "It has at least 4gb"],
        image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQERUQDxIVEBAXFRUSFRUVFRAQFRIVFhUXFhUVFxUYHSggGBolGxUVITEhJSkrLi4uFx8zODMuNygtLisBCgoKDQ0NFw0PFSsdFRktKy0rKysrLisrNzctNys2NzcrKzc4LSs3Ny8rLi01NzI3Kys4OC01Mzc0KysyKys3N//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAAcBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABKEAABAwICBQYKBggFBAMAAAABAAIDBBESIQUGMUFRBxMiYXGRCDJSYnKBkqGxwRQjM0KiwiQ0Y3OCsrPRQ3ST8PGjtMPhRFOD/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAeEQEAAwACAgMAAAAAAAAAAAAAAQIREiExUQNBcf/aAAwDAQACEQMRAD8A7iiIgIiICIrHTekG00ElQ8gNjYXEnIC3FBfKBcBtNlyzkv1jqq36ZXVLpJ4Wv5uJjeaYxjWtxuOG4JJBbtBWKruWWEfZUsjut7mN9wuUHYn1TB94erP4KhLpSNvlHsaVwat5Z6o/Z00TRuu97v7LA1XKxpF984mejHn7yiPQ0WtdO6pZSASCZ7XOZdoDXYM3DFfbZZh1S1vjHD2ggd+xeUNG62Vr6kVBnPPRRzvjcGxjCRC8nK1je1s1t+r3K3pJ9RBBMYZWSyRxkmMtc3G4NuCDuvf1IPQkcrXZtIcOog/BTrX6nRkhz5uJ54sc6F3wPxWNq6qamaXvfNAwZkyBs0Y7XtLreuyYNxRaZo7W90gvE+nqxv5qVuLuBNlkm62Rj7WKWPicPOAezn7kNbEixlFrBSTHDHURl/kFwY/2HWcO5ZIFFRRQuooCIiAiIgIiICIiAiIgIiICIiAtd5RIcei6xvGnk78OS2JYvWiPHR1DeMMg/CUHKuQCTFQ18fnB3tQkflXH6gWJHWR711fwcHX+mM4thNvbC5XpEWkeOD3jucQqzK0dHcXz39gAtn71aPaRe4tb1LYtWweebYhp6Yu4Pe3PC3pMaCXjPxdmWZWN01+sPLswSxxHSFw5rXEWdm3I7N3chClob7R37ip/7eRXmrv65R/5iD+qxTU5hdVE04cIzDUGzhbCTTSXaDc3A4m3YpdXP1uj/wAxB/VYh9vXOldIR00MlRM7BFG0ve47gPnuXmDXrXGfSs2OS7Kdp+qhv0WDc5w2F5G/duXS/CC06WxQ0DDbnDz0nW1h6Dfaz/hC4eSiyl33GR3EZHvCylFrPWw5R1MtuDnc4O591iypCjLbm8oE7xhqoYKlvnNwn5q+o9eo2fYyVlA7Z9VIKiIW4RSZAdi0EqUlFdfoOVitj8Wakr25DC8Oopj2h9mk9hK2Gi5b4GkNraOeA7y3DK33kH4rz6UDyBYEgcLm3couvVuieUvRNTYR1kbHH7suKA34dMAE9hW0wVDHi7HNeOLSHD3LxMVdUGkpqc3p5pIT5j3Mv22OaK9p3UV555OeVSqZOyCumM0T3sa1zw27buwkYsrZG9z5Nt69C3QRREQEREBERAREQEREBWulGYoZRxjePwlXSpztu1w4gjvCDhHg6Pw1dXH+yb+GQj5rnesMeGpnbwnmH/Uct/5CnYNLVLOLJR7Mq0vXaPDpCrbwqZh+Mn5qsyttX786AwhshEgYXXw4y0WuBmcri2e5Y/T4tUSC4LuiHkZAvwjHYHMdK+Rz7NiutDtJkAaS1/SwkWxYiywsSDY9fUVZ6bicyZzXvxvDWhxOfSDRfOwv2oJtXvt//wA5/wDt5FX1eP6VSfv4f6rFQ1d/WG+hKO+GQKbQz7VFKeE0R/G1FbhyxaQ57S04GyIMhHa1uI/ze5aSVktZKgy1lTITcuqJjfq5xwHuAWMKIlJUpUSVKSggVKUJUpQCoFCVBFERQQZnU2m53SFLHa+KoiFv4gfkvYq8ncksGPTNGOEjn+xG53yXrJRRERAREQEREBERAREQFBRUEHnvknHN6wzM/wA0Px3WtcpkWDStaP25d7TGO+a2XVEc1rVI39vUN7xdYTlgZh0zVjiYXDsNPF/Yqo1rQz7StvsNwRexcC09EG4sTYC9wqeskmKYuJFyxpIyuwnMtJBIJ336xsVm7erfiiL7V8/pDOx4743BQ0YbTQH9oz+YJoE/pEfaR3tIUlC60kJ4Pb8QoqtWOvJIeMjz3vJVAlTSuu4nrJ95VMqogSpSVElSkoIFSqJKlQERQUUREQdE5BafHphjvIhmf3gM/OvTa89eDjTXrqiXyabB7cjT+RehUUREQEREBERAREQEREBERB54iODW47r1bvXiiJWP5b47aYmPlRQO/Bh/KsjrAea1tB41EB9uFo+ap+EAy2lWHjSRHuklH9lUczJ2qhx7FVJVHj2Ii80IbVEXphWx2NVbRJ+vi9NvxVA7GqKrkqQlRJUpKqIEqUqJKlJQFBFBRRERARECDuHg10+VbLxMDAeznHEfiC7euT+DnT4aCZ/l1B7msYPjddYRRERAREQEREBERAREQEREHnflN6GssTuMlE78TW/JXPhFR2raZ/GncO6S/wCZUOW76vTkD/2VM/ttNIPyq+8Itv1tE/jFMO4xn8yI46SqanKpoK+jjaaM+e34hUz4oUaU9NnpN+IUrtgVFQlSkqJUpRAqVRKgUVBERQEUbKBQFeaJ0XNVytgponTSu2NaCe0k7GgcTkt01G5LamvwzVF6Wk24nD62QeYw7B5xy4XXeNXtX6agjEVJEI25Yjte8je520q4rE8i9A6n0bzElhLHPOx9jcYmvIyO9b6tR5PHdGrb5NbUfiId+ZbcoCIiAiIgIiICIiAiIgIiIPPfhFR4dIU8g2mlA9iZ5H8yu+Xx/ORUUgzAMjb+kxh/Ko+EnHaajdximb7LmH8yx3KpPzlBSP8AOZ+KG6qOWFSKYqTegng8ZvpD4hRd4o7VJGcx2hTv8UdqASoFFBAUERQEUWNJIABJOQAFySdgA3raaHVhsJa7SGPnHWMdFDZ1TLwMm6BmzM9IjYN6DD6D0DUVr8FNGX2zc4kMjjaNrnyOs1o7V3Hk95NaOmjjq5nMrZi0PbJtgYOMYd4w85w9QWjvle+1I6NpwkFujaU4YYvOrajedtxcnLMhYLWPW2rqGikfI1lPEOZEUFmREM6P3bhwyyztZB1/WrlXo6QmOn/TZxl0DaJh4GTf2Nv2rmmk+VfScrrslbTtBvhjY0+pxdcn3LRsSlLlU16O5DdJvqqWpnmIMr6tznWFhcxx7BuXSlyHwcX/AKJVN3ioB742j5LryjQiIgIiICIiAiIgIiICIiDiXhJxXFC7gahveIj8lrGuZx6HpHdVOf8ApWW6+EdH+jUr+E7m98ZP5Voumpcegad3Dm2+w97PyqpLnSMbml+ChcqA3d6lO/xfWpAp3eL61RKoKKnpqd8r2xxNdJI42a1oLnOPAAIKazGgdXJ6zE9mGKnZ9pUSnm4Yx1u3nqGa2Ci1VhpCHaR+vqbYm0MTwMOWRqphlEzzR0irms0uZsJcYXsj8QWMWjqTdaOIZ1EgttOXaoJqCOKjjx0ZETTkdI1Ed5ZSR4tFS7QPOJub5luxS4uaBB5ylEueEHn9J1t973HKFp93BxzNo/SBB57nC15yNXO3HM7zaWn2Rt29ee0bFaOrObvYvgD/ABnE87W1Ha7/AAweAtbrQZJzrD6O9nNxm5Gj6U3kksNtVUbuvaeAC0uR9ySBYEk222zyFyswa0tY5g+oYQehGcUryd8sh3cdnUsCSqJi5SkqBKgSg7r4Nkt46xnB8Tu9rh+VdpXDPBqf0q5u61Of6oXc1FEREBERAREQEREBERAREQcp8ImK+j4XeTUt98bwuWU9W+ooaXRdO0PlcZJZHO8WNgme5p6t5J4W4rrnhAuA0W2+0zx4e3Mn3AriOiJX09PUvbdsjuZjDx9xjrPIB3XFgs3mYjrykug6E1WpX076WoZDOI4y81Ib9HlYcWWFwzeAT97ssuW6x6GdRTmFxxN2sfue07D3WXUtWDJUaMqKhzhG8jmTYeMAQS4DcTuC0vlBjDWUjRiNo3su4WNmkED1Yj7lw+O+34xblnU/rET3jTlOfF9aljbcgcSB3lXZYYZXNNnGOQjMYmuLHEZtO0ZbF6m2T0DqvJUDnZpGUdINs8xwgjhG3bIexZ+q07R0cX0bQzJRIcpa1wYJpW2zjiBH1LCbG4seiNt1qE9Y+Wz5Xl7uLje3ZwHYpIzc7L+vCP4jwUF66YuuDYi9y25EYPlSP2yFHVBNnEh1tj3izGfu49/aqF7i+RA2E9GNvot+8VBx2PJtwe/b/Azd2qoquqCDjxFrj/iP6UrvQb90f7uqTnltzcx32k9KZ/8Ab3KU9HpE4L/ed0pHdg+6P93UHdHP7PzndJ7uwbv95oqN8LXf4dxkPGe/0ju9ysSrp+TDbogkXx5vd1jh6u9WigIiIOxeDbJ+k1beMUZ7nkfmXfV528HKa2kZ2caVzvZliH5l6JRRERAREQEREBERAREQEREHHvCOqAKaki8qZ7/UyMj84Wj6P0a6KWGKRhMVfR080TsJcBKxjRs9IZ+k1Z/wkam9RSReTDLJ7bmtH9NZLX/Tn0LRuizRSxmWIxsDm4JQMEFnNI7rjsWb15VxJhiNFaBkdBWxzFsT7QuYXvDGHC83cHbLAbxsWga56SZLIyKFxkhhZzbXm/1ribySZ52JsB1NCtNN6Wlq5nVFQ7HI7be9u75LFPNzcrMUnYtafHpmIxUpB9Yz02/zBXOkj9dMf2kn85VvQfax+mz+YKrXHpynz3/zFdWlAHJTxZnO38RyHq3qldTwHPaB1kXI7BxQXRd94nse8X9hiiTbpE4PPf0pDn91u7tUpOHM9A+U7pSHsG5CcOfiHbif0pD1gbu1A2dLxPPf0pD1gbu1SecBbfjfmT2BR2dLxb545Dd56wFJa/SALvPfs/8AaBL4l7YgT45234f8q2VeptZt7l1tu4jdYblQUBERB0zwe3gaWcONNKB7cZ+S9JrzFyDvtpiMcYph+C/yXp1FEREBERAREQEREBERAREQeeOWmVsmnYmPbzjWxU8Rbmb43vdawz++DlmqHLXpCOWqiEZdlDHiDo5YXYm863EWyNaTtAvbcqmsQ+la1hm0Cpgb/pMa74tKtOXeqx6Xe3/64IY+8Ok/8iqOdvKouVVypFCFfRv20f7xn8wSodcvPFzj+IpQG0sfps/mCkv0SUFNVac2ORIPULuPZwVJVafeOl2N39p3BQVgcO/AerpyH1/dU3i8I+s9KQ+rcoMdbIHD1R9J/rduUScOzDF1npyH1bvcqIW+8G2v9+Q5nsG/3qmbHPpSHicmhTO8rCT58hVNzr7SX9QyagVDtgvcAeLuad9lRVSc3Of/ALt1qmoCIiDdeRmTDpqk6zK3vhkXqpeTOSl+HTFGf2pHexwPxXrNFEREBERAREQEREBERAUFFUqmTAxzuDS7uBKDz3qd+la0Pl22nqJfZBb81rfKxU85pisdwkbH/pxsZ8WlbRyEsEulqifgyR3+pJZc/wBbanna+qkvfFUSn8ZVRiHKRTFQQVKQ/WN9IHuN1L93uSA9If73FD4qgkVWBt75F3rwj1qkqsDb3yB9I2AQVxJuB/hiHxf/AGupT0dzY+3pv7lHHfLEXdUYwj1uP9lJ4uwNZ2nE75qqgRfOznni7IdylvfIuA6m7PWf+VB7gdpc7tyHcoNfY7AFEQk2ntUqEogIiINj5OZMGlaJx2fSI/ebL12vHmpcb/p9K5rSbTxm4B8ob17ERRERAREQEREBERAREQFidbKnmqKpk8mGQ/hKyy1DlZmLNEVZAveLDlwcQD7ig5XyEHm2Vk/Bsbb9jXPPwC5VVSYnvdxc497iV0jUX6nRdRKZHRkulJDXNbdrY2ht2uB4uz61zIFVAqCFEEY9vf8AAqLvFUrfkfgp3bAgpqeN1twPbnb1KRXdHo6eX7KF8l94YSO+1lBRdKTlckcBkFJ6lsdNqRXSeMwRDz3Nb7hdZSLk/azOpq2sG8Mbc97iPgqa0f1oNthme9dM0fqlRX+qinrHfxuH4AG962/ReqFV/wDHoYqdvGQsZbrwtBPvUTXFaTQFVN9nA89ZGEe9ZeDUaoOcr44h1kuPuyXcafk9qH/rFZgHkwRhvqxPuVmKLk7oWZvY+odxle59/wCHYi9uBU+qNODZ8z53eTG23qsMR+C2bROoUr7fR6A+nMQwdvSuV3mk0ZDCLRRMjHmtAV1ZDHPNTuT19PM2oqnsJZmyKNpDQ7c5zj41twyztwXRERFEREBERAREQEREBERAVppShZUQyQStxRyMLHDiHCyu0QcxOr9bTUrKM0sVbDE0xteebL3xhxwBzHC1w0huRzstQ0lq9BY89ot8PoxOFuwxFd8QhNTHmCfVuhJ2vh6nGRlvbCpxak0zz0Kk+1EV6dkpI3eNGx3a1pVnNq9SP8amhd2xs/srqZPt5T1o1cFC9rDIZC9uJtg0XGziuhaC1A0XDAx+kJzU1TmhxhiecDCRfDaMYnHjmF2Ruq1CDf6JBf8AdsPyWRgoooxaONjB5rWt+CauOSUegYQR9A0Uep7ow38cpxLMw6q6Rk2mClb/ABTO7hhC6TZE0xo1PyctOdTVzy8WsLYG/gF/es1o/UuggzZTsLvKfeR3e662BFFU44WtFmtDRwAA+CnsoogWREQEREBERAREQEREBERAREQEREBERBBRREEAooiCAUURBBRKIgIiICIiAiIgIiICIiAiIgIiICIiD//Z',
        requester: { name: 'Ikey' },
        offers: 1,
        createdAt: '1 day ago'
    },
    {
        _id: 2,
        name: 'iPhone 6s',
        description: 'I want an iPhone 6s so please if you have one please message me so we can discuss price.',
        requirements: ['Relatively new condition', 'Still works', "It has at least 4gb"],
        image: 'https://i5.wal.co/asr/f0d5cb32-b414-4ded-80e4-871109f94704_1.aa412094052249a628594b0f17192c16.jpeg-611202bc199322e7b3cf2cb532010ea5255aa1dd-optim-450x450.jpg',
        requester: { name: 'Nathan' },
        offers: 2,
        createdAt: '3 days ago'
    },
    {
        _id: 3,
        name: 'Microwave',
        description: 'I want a microwave so please if you have one please message me so we can discuss price.',
        requirements: ['Relatively new condition', 'Still works', "It has at least 4gb"],
        image: 'https://i5.wal.co/asr/18652377-1a34-4154-925a-a51569ddee61_2.5da704269c4cbb2f250339ff59da724d.jpeg-48be6f87a667c8189e7d4008297a15194d4c8f0b-optim-450x450.jpg',
        requester: { name: 'Nya' },
        offers: 3,
        createdAt: '5 days ago'
    },
    {
        _id: 4,
        name: 'Hard Drive',
        description: 'I want a hard drive so please if you have one please message me so we can discuss price.',
        requirements: ['Relatively new condition', 'Still works', "It has at least 4gb"],
        image: 'https://target.scene7.com/is/image/Target/GUEST_52c6c76f-d2f4-4e62-839b-871b231b8705?wid=488&hei=488&fmt=pjpeg',
        requester: { name: 'Jaeson' },
        offers: 0,
        createdAt: '3 hours ago'
    },
    {
        _id: 5,
        name: 'Headphones',
        description: 'I want a pair of headphones so please if you have one please message me so we can discuss price.',
        requirements: ['Relatively new condition', 'Still works', "It has at least 4gb"],
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/H/JD/HJDJ2/HJDJ2?wid=572&hei=572&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1498060668986',
        requester: { name: 'Peter' },
        offers: 2,
        createdAt: '16 hours ago'
    },
    {
        _id: 6,
        name: 'Xbox Remote',
        description: 'I want an Xbox remote so please if you have one please message me so we can discuss price.',
        requirements: ['Relatively new condition', 'Still works', "It has at least 4gb"],
        image: 'https://target.scene7.com/is/image/Target/GUEST_bc69fc3e-28fc-4043-8a58-b8399863e352?wid=488&hei=488&fmt=pjpeg',
        requester: { name: 'Bob' },
        offers: 5,
        createdAt: '2 days ago'
    },
    {
        _id: 7,
        name: 'Left Air Pod',
        description: 'I lost my left air pod so please if you have one please message me so we can discuss price.',
        requirements: ['Relatively new condition', 'Still works', "It has at least 4gb"],
        image: 'https://atlas-content-cdn.pixelsquid.com/stock-images/apple-airpod-left-side-earphones-n1PmZq3-600.jpg',
        requester: { name: 'Jaeson' },
        offers: 0,
        createdAt: '3 hours ago'
    },
    {
        _id: 8,
        name: 'Hard Drive',
        description: 'I want a hard drive so please if you have one please message me so we can discuss price.',
        requirements: ['Relatively new condition', 'Still works', "It has at least 4gb"],
        image: 'https://target.scene7.com/is/image/Target/GUEST_52c6c76f-d2f4-4e62-839b-871b231b8705?wid=488&hei=488&fmt=pjpeg',
        requester: { name: 'Jaeson' },
        offers: 0,
        createdAt: '3 hours ago'
    }
]

module.exports = { products }
