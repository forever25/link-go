class GameScene {
  level_map = [
    {
      width: '200px',
      height: '200px',
      col:10,
      row:20,
      size:40
    }
  ]
  constructor(options = {
    width: '200px',
    height: '200px'
  }) {
    this.objectList = [];
    this.width = '200px'
    this.height = '200px'
  }

  /**
   * @description: 添加物体到游戏场景
   * @return {*}
   */
  addObject() {

  }

}